import React from 'react';
import {Text, View, ScrollView, PermissionsAndroid, Alert} from 'react-native';
import {
  RunningProps,
  Run,
  RunningState,
  LocationLatLong,
  WayPoint,
} from './functional/interfaces';
import {
  calculateDistance,
  formatDistance,
  formatTime,
} from './functional/functions';
import {backgroundBlack, mainBlueDark, styles} from './styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WakeLockInterface} from 'react-native-android-screen-on';
import {LockCircle} from './components/LockCircle';
import {DialogueBoxWithButtons} from './components/DialogueBoxes';
import {BackButton, RunningSectionButton} from './components/Buttons';
import VIForegroundService from '@voximplant/react-native-foreground-service';
import Timer from 'react-native-background-timer-android';
import BackgroundGeolocation from '@darron1217/react-native-background-geolocation';
import Gradient from './components/Gradient';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import systemSetting from 'react-native-system-setting';

BackgroundGeolocation.configure({
  desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
  stationaryRadius: 50,
  distanceFilter: 0,
  notificationTitle: 'Background tracking',
  notificationText: 'enabled',
  debug: false,
  startOnBoot: false,
  stopOnTerminate: true,
  locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
  interval: 2000,
  fastestInterval: 5000,
  activitiesInterval: 10000,
  stopOnStillActivity: false,
});

VIForegroundService.createNotificationChannel({
  id: 'channelId',
  name: 'Runner',
  description: 'Channel for the runner app',
  enableVibration: false,
});

const startForegroundService = async () => {
  const notificationConfig = {
    channelId: 'channelId',
    id: 3456,
    title: 'Runner',
    text: 'Some text',
    icon: 'ic_icon',
  };
  try {
    await VIForegroundService.startService(notificationConfig);
  } catch (e) {
    console.error(e);
  }
};

class Running extends React.Component<RunningProps, RunningState> {
  constructor(props: any) {
    super(props);
    this.state = {
      time: 0,
      startTime: new Date(),
      distance: 0,
      timer: null,
      timeRunning: false,
      started: false,
      currentLocation: {longitude: 0, latitude: 0},
      newDistance: 0,
      unlocked: false,
      backing: false,
      runningPath: [],
      runMeasurements: [],
      wayPoints: [],
      currentWayPoint: 1,
      timeToLastWp: 0,
      ended: false,
      locationDialogEnabled: false,
    };
  }

  _mounted = false;

  async componentDidMount() {
    this._mounted = true;

    const requestLocationPermission = async () => {
      try {
        const granted = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          {
            title: 'Runner app location permission',
            message: 'Runner needs access to your location',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === RESULTS.GRANTED) {
          console.log('Granted');
        } else {
          console.log('Denied');
        }
      } catch (err) {
        console.log(err);
      }
    };
    await requestLocationPermission();

    const setWakeLock = WakeLockInterface.setPartialWakeLock()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this._mounted = false;
    const releaseWakeLock = WakeLockInterface.releasePartialWakeLock()
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  startRun = () => {
    systemSetting.isLocationEnabled().then(enabled => {
      if (!enabled) {
        this.setState({locationDialogEnabled: true});
      } else {
        startForegroundService();
        const date = new Date();
        this.setState({
          started: true,
          timeRunning: true,
          ended: false,
          startTime: date,
        });
        const timer = Timer.setInterval(() => {
          this.setState(prev => ({
            time: prev.time + 1,
          }));
          if (this.state.distance / 1000 >= this.state.currentWayPoint) {
            this.setState(prev => ({
              wayPoints: prev.wayPoints.concat({
                distance: prev.currentWayPoint,
                time: prev.time - prev.timeToLastWp,
              }),
              currentWayPoint: prev.currentWayPoint + 1,
              timeToLastWp: prev.time,
            }));
          }
        }, 1000);
        this.setState({timer: timer});
        this.locationHandler();
      }
    });
  };

  locationHandler = () => {
    BackgroundGeolocation.start();
    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
    });
    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });
    BackgroundGeolocation.on('location', location => {
      if (location) {
        if (
          this.state.currentLocation.latitude === 0 &&
          this.state.currentLocation.longitude === 0
        ) {
          this.setState({
            currentLocation: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          });
        } else {
          const newLocation: LocationLatLong = {
            latitude: location.latitude,
            longitude: location.longitude,
          };
          const currentDistance = calculateDistance(
            this.state.currentLocation.longitude,
            newLocation.longitude,
            this.state.currentLocation.latitude,
            newLocation.latitude,
          );
          if (currentDistance > 10) {
            this.setState(prev => ({
              currentLocation: newLocation,
              distance: prev.distance + currentDistance,
              runningPath: prev.runningPath.concat(newLocation),
              runMeasurements: prev.runMeasurements.concat({
                distance: prev.distance + currentDistance,
                time: prev.time,
                altitude: location.altitude,
                speed: location.speed * 3.6,
              }),
            }));
          }
        }
      }
      BackgroundGeolocation.startTask(taskKey => {
        BackgroundGeolocation.endTask(taskKey);
      });
    });
  };

  pauseAndResume = () => {
    if (this.state.timeRunning) {
      this.setState({timeRunning: false});
      Timer.clearInterval(this.state.timer);
      BackgroundGeolocation.stop();
    } else {
      this.setState({timeRunning: true});
      const timer = Timer.setInterval(() => {
        this.setState(prev => ({
          time: prev.time + 1,
        }));
        if (this.state.distance / 1000 >= this.state.currentWayPoint) {
          this.setState(prev => ({
            wayPoints: prev.wayPoints.concat({
              distance: prev.currentWayPoint,
              time: prev.time - prev.timeToLastWp,
            }),
            currentWayPoint: prev.currentWayPoint + 1,
            timeToLastWp: prev.time,
          }));
        }
      }, 1000);
      this.setState({timer: timer});
      this.locationHandler();
    }
  };

  endRun = async () => {
    VIForegroundService.stopService();
    BackgroundGeolocation.stop();
    let run: Run = {
      date: this.state.startTime,
      time: this.state.time,
      distance: this.state.distance,
      path: this.state.runningPath,
      runMeasurements: this.state.runMeasurements,
    };
    try {
      const d = JSON.stringify(run.date);
      const stringifiedRun = JSON.stringify(run);
      await AsyncStorage.setItem(JSON.parse(d), stringifiedRun);
      this.setState({
        timeRunning: false,
        started: false,
        time: 0,
        unlocked: false,
        runningPath: [],
        runMeasurements: [],
        ended: true,
      });
      Timer.clearInterval(this.state.timer);
      return true;
    } catch (err) {
      console.log(err);
    }
  };

  unlockedCallback = () => {
    this.setState({unlocked: true});
  };

  lockedCallback = () => {
    this.setState({unlocked: false});
  };

  goBack = () => {
    this.endRun()
      .then(res => {
        this.props.navigation.goBack();
      })
      .catch(err => console.log(err));
  };

  handleArrowClick = () => {
    if (this.state.started) {
      this.setState({backing: true});
    } else {
      this.props.navigation.goBack();
    }
  };

  render() {
    return (
      <View style={styles.runningSection}>
        <Gradient color1={mainBlueDark} color2={backgroundBlack} />
        <View style={styles.backSection}>
          <BackButton pressHandler={this.handleArrowClick} />
        </View>
        {this.state.backing && (
          <DialogueBoxWithButtons
            text="Are you sure you want to end the run?"
            confirmText="Confirm"
            cancelText="Cancel"
            confirmAction={this.goBack}
            cancelAction={() => this.setState({backing: false})}
          />
        )}
        <DataDisplay distance={this.state.distance} time={this.state.time} />
        <View style={styles.runningStartSection}>
          <RunningSectionButton
            pressHandler={() => this.startRun()}
            text="Start Run"
            disabled={this.state.started}
            buttonStyle={styles.runningStartButton}
            textStyle={styles.runningStartButtonText}
            disabledStyle={styles.runningStartButtonDisabled}
          />
        </View>
        <Waypoints wayPoints={this.state.wayPoints} />
        <View style={styles.runningControlSection}>
          <RunningSectionButton
            pressHandler={() => this.endRun()}
            text="End Run"
            disabled={!this.state.timeRunning || !this.state.unlocked}
            buttonStyle={styles.runningControlButton}
            textStyle={styles.runningControlButtonText}
            disabledStyle={styles.runningControlButtonDisabled}
          />
          <LockCircle
            lockedCallback={() => this.lockedCallback()}
            unlockedCallback={() => this.unlockedCallback()}
            started={this.state.started}
            ended={this.state.ended}
          />
          <RunningSectionButton
            pressHandler={() => this.pauseAndResume()}
            text={this.state.timeRunning ? 'Pause' : 'Resume'}
            disabled={!this.state.started || !this.state.unlocked}
            buttonStyle={styles.runningControlButton}
            textStyle={styles.runningControlButtonText}
            disabledStyle={styles.runningControlButtonDisabled}
          />
        </View>
        {this.state.locationDialogEnabled && (
          <DialogueBoxWithButtons
            text="Your location has to be enabled to start the run"
            confirmText="Enable Location"
            cancelText="Cancel"
            confirmAction={() => {
              systemSetting.switchLocation(),
                this.setState({locationDialogEnabled: false});
            }}
            cancelAction={() => this.setState({locationDialogEnabled: false})}
          />
        )}
      </View>
    );
  }
}

export default Running;

interface DataDisplayProps {
  distance: number;
  time: number;
}

const DataDisplay = ({distance, time}: DataDisplayProps) => {
  return (
    <View style={styles.runningDataSection}>
      <Text style={styles.runningDataSectionText}>
        {formatDistance(distance)} km
      </Text>
      <Text style={styles.runningDataSectionText}>{formatTime(time)}</Text>
    </View>
  );
};

interface WaypointsProps {
  wayPoints: WayPoint[];
}

const Waypoints = ({wayPoints}: WaypointsProps) => {
  return (
    <View style={styles.runningWayPointSection}>
      <Text style={styles.runningWayPointSectionHeader}> WAYPOINTS</Text>
      <ScrollView>
        {wayPoints.map(pt => (
          <Text
            key={`wp-${pt.distance}-${pt.time}`}
            style={styles.runningWayPointEntry}>
            {`Kilometer ${pt.distance} – Time: ${formatTime(pt.time)}`}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};
