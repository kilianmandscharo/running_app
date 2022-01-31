import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, Animated} from 'react-native';
import {
  AllRunsData,
  HistoryMenuProps,
  HistoryProps,
  RenderItemProps,
  RunFullInformation,
  SingleRunData,
  RunReducedInformation,
} from './functional/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {backgroundBlack, mainBlueDark, styles, WIDTH} from './styles/styles';
import * as RNFS from 'react-native-fs';
import {gpxParser} from './functional/gpxParser';
import {extractYearMonthDay} from './functional/functions';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DialogueBox,
  DialogBoxConfirmCancel,
  DialogBoxThreeButtons,
} from './components/DialogBoxes';
import {BackButton, HistoryButton, StandardButton} from './components/Buttons';
import {ListItem} from './components/ListItem';
import LoadingCircle from './components/LoadingCircle';
import {DeleteIcon, ExportIcon, VisualizationIcon} from './components/Icons';
import Chart from './AllRunsChart';
import Gradient from './components/Gradient';
import SingleRunGraph from './SingleRunGraph';

const History = (props: HistoryProps) => {
  const [singleRunData, setSingleRunData] = useState<any>([]);
  const [allRunsData, setAllRunsData] = useState<any>([]);

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="HistoryMenu">
      <Stack.Screen
        name="HistoryMenu"
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: backgroundBlack},
        }}>
        {props => (
          <HistoryMenu
            {...props}
            setAllRunsData={setAllRunsData}
            setSingleRunData={setSingleRunData}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="VisualizerSingle"
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: backgroundBlack},
        }}>
        {props => <SingleRunGraph {...props} data={singleRunData} />}
      </Stack.Screen>
      <Stack.Screen
        name="AllRunsChart"
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: backgroundBlack},
        }}>
        {props => <Chart {...props} allRunsData={allRunsData} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const HistoryMenu = (props: HistoryMenuProps) => {
  const [runs, setRuns] = useState<RunFullInformation[]>([]);
  const [loading, setLoading] = useState(false);
  const [runsPrepped, setRunsPrepped] = useState(false);
  const [clearingSingle, setClearingSingle] = useState(false);
  const [clearingAll, setClearingAll] = useState(false);
  const [exportingSingle, setExportingSingle] = useState(false);
  const [exportingAll, setExportingAll] = useState(false);
  const [runExportedAsGPX, setRunExportedAsGPX] = useState(false);
  const [runExportedAsJSON, setRunExportedAsJSON] = useState(false);
  const [allRunsExportedAsGPX, setAllRunsExportedAsGPX] = useState(false);
  const [allRunsExportedAsJSON, setAllRunsExportedAsJSON] = useState(false);
  const [exportedFail, setExportedFail] = useState(false);
  const [idOfCurrentRun, setIdOfCurrentRun] = useState('');

  useEffect(() => {
    const getAllRuns = async () => {
      setLoading(true);
      const allRuns = await loadRuns();
      setLoading(false);
      if (allRuns) {
        setRuns(allRuns.reverse());
      }
    };
    getAllRuns();
  }, []);

  useEffect(() => {
    const prepped = prepRunsForChart();
    setRunsPrepped(prepped ? true : false);
  }, [runs]);

  const loadRuns = async () => {
    let keys: string[] = [];
    try {
      keys = await AsyncStorage.getAllKeys();
      const runs = await getRuns(keys);
      return runs;
    } catch (err) {
      console.log(err);
    }
  };

  const getRuns = async (keys: string[]) => {
    const runs: RunFullInformation[] = [];
    for (const key of keys) {
      try {
        const run = await AsyncStorage.getItem(key);
        if (run) {
          const parsedRun = JSON.parse(run);
          runs.push(parsedRun);
        }
      } catch (err) {
        console.log(err);
      }
    }
    return runs;
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setRuns([]);
      setClearingAll(false);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      deleteRunFromState(key);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRunFromState = (key: string) => {
    let runsCopy = [];
    for (const entry of runs) {
      runsCopy.push({...entry});
    }
    runsCopy = runsCopy.filter(entry => entry.date !== key);
    setRuns(runsCopy);
  };

  const getRunFromRunsById = (id: string) => {
    let currentRun;
    for (const run of runs) {
      if (run.date === id) {
        currentRun = run;
      }
    }
    return currentRun;
  };

  const exportRunAsGPX = (id: string) => {
    const currentRun = getRunFromRunsById(id);
    if (currentRun) {
      const path = currentRun.path;
      if (path.length > 0) {
        const data = gpxParser([currentRun]);
        id = id
          .split('')
          .map((char: string) => (char !== ':' ? char : '_'))
          .join('');
        RNFS.write(
          RNFS.DownloadDirectoryPath + `/run_${id}.gpx`,
          data,
          undefined,
          'ascii',
        )
          .then(res => {
            setRunExportedAsGPX(true);
          })
          .catch(err => {
            console.log(err);
            setExportedFail(true);
          });
      }
    }
  };

  const exportRunAsJSON = (id: string) => {
    const currentRun = getRunFromRunsById(id);
    if (currentRun) {
      const path = currentRun.path;
      if (path.length > 0) {
        const data = JSON.stringify({run: currentRun});
        id = id
          .split('')
          .map((char: string) => (char !== ':' ? char : '_'))
          .join('');
        RNFS.write(
          RNFS.DownloadDirectoryPath + `/run_${id}.json`,
          data,
          undefined,
          'ascii',
        )
          .then(res => {
            setRunExportedAsJSON(true);
          })
          .catch(err => {
            console.log(err);
            setExportedFail(true);
          });
      }
    }
  };

  const exportHistoryAsGPX = () => {
    const data = gpxParser(runs);
    RNFS.write(
      RNFS.DownloadDirectoryPath + `/all_runs.gpx`,
      data,
      undefined,
      'ascii',
    )
      .then(res => {
        setAllRunsExportedAsGPX(true);
      })
      .catch(err => {
        console.log(err);
        setExportedFail(true);
      });
  };

  const exportHistoryAsJSON = () => {
    const data = JSON.stringify({runs: runs});
    RNFS.write(
      RNFS.DownloadDirectoryPath + `/all_runs.json`,
      data,
      undefined,
      'ascii',
    )
      .then(res => {
        setAllRunsExportedAsJSON(true);
      })
      .catch(err => {
        console.log(err);
        setExportedFail(true);
      });
  };

  const visualizeSingleRun = (id: string) => {
    const run: RunFullInformation | undefined = getRunFromRunsById(id);
    if (run) {
      if (!run.runMeasurements.length) {
        return false;
      }
      const data: SingleRunData = {id: id, data: run.runMeasurements};
      props.setSingleRunData(data);
      return true;
    } else {
      return false;
    }
  };

  const prepRunsForChart = () => {
    if (!runs.length) {
      return false;
    } else {
      //Here the runMeasurements are discarded, only the total distance and
      //total time are handed down for each run to the chart, but first,
      //the runs have to be prepared for ordering by year
      const allYears: number[] = [];
      const runData: RunReducedInformation[] = runs.map(run => {
        const [year, month, day] = extractYearMonthDay(run.date);
        allYears.push(parseInt(year));
        return {
          distance: run.distance,
          time: run.time,
          year,
          month,
          day,
        };
      });

      //The unsorted runs are sorted by the extracted years
      const runsByDate = sortRunsByDate(allYears, runData);
      const data: AllRunsData = {
        maxYear: Math.max(...allYears.map(year => year)),
        minYear: Math.min(...allYears.map(year => year)),
        years: [...new Set(allYears)],
        runsByDate: runsByDate,
      };
      props.setAllRunsData(data);
      return true;
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const navigateToSingleRunHistory = () => {
    props.navigation.navigate('VisualizerSingle');
  };

  const renderItem: any = ({item, index}: RenderItemProps) => {
    return (
      <ListItem
        date={item.date}
        time={item.time}
        distance={item.distance}
        index={index}
        exportRun={() => setExportingSingle(true)}
        deleteRun={() => setClearingSingle(true)}
        setIdOfCurrentRun={setIdOfCurrentRun}
        visualizeSingleRun={visualizeSingleRun}
        navigate={navigateToSingleRunHistory}
      />
    );
  };

  return (
    <View style={styles.history}>
      <Gradient color1={mainBlueDark} color2={backgroundBlack} />
      <View style={styles.backSection}>
        <BackButton pressHandler={goBack} />
      </View>
      <View style={styles.historyListSection}>
        {runs.length === 0 && !loading && (
          <Text style={styles.historyEmptyWarning}>No runs yet</Text>
        )}
        {loading && <LoadingCircle />}
        <AnimatedFlatlist
          scrollEventThrottle={16}
          data={runs}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.date}
        />
      </View>
      <View style={styles.historyButtonSection}>
        <HistoryButton
          pressHandler={() => setExportingAll(runs.length ? true : false)}
          text="Export All"
          buttonStyle={styles.historyButton}
          textStyle={styles.historyButtonText}
          opacity={0.5}>
          <ExportIcon />
        </HistoryButton>
        <HistoryButton
          pressHandler={() => {
            if (runsPrepped) {
              props.navigation.navigate('AllRunsChart');
            }
          }}
          text="Visualize All"
          buttonStyle={[styles.historyButton]}
          textStyle={styles.historyButtonText}
          opacity={0.5}>
          <VisualizationIcon />
        </HistoryButton>
      </View>
      <View style={styles.historyLowerButtonSection}>
        <HistoryButton
          pressHandler={() => setClearingAll(!clearingAll)}
          text="Clear History"
          buttonStyle={[styles.historyButton, {width: WIDTH / 1.1}]}
          textStyle={styles.historyButtonText}
          opacity={0.5}>
          <DeleteIcon />
        </HistoryButton>
      </View>
      {exportingSingle && (
        <DialogBoxThreeButtons
          text="Choose the type of export."
          firstChoiceText="GPX"
          secondChoiceText="JSON"
          cancelText="Cancel"
          firstChoiceAction={() => {
            setExportingSingle(false);
            exportRunAsGPX(idOfCurrentRun);
          }}
          secondChoiceAction={() => {
            setExportingSingle(false);
            exportRunAsJSON(idOfCurrentRun);
          }}
          cancelAction={() => setExportingSingle(false)}
        />
      )}
      {exportingAll && (
        <DialogBoxThreeButtons
          text="Choose the type of export."
          firstChoiceText="GPX"
          secondChoiceText="JSON"
          cancelText="Cancel"
          firstChoiceAction={() => {
            setExportingAll(false);
            exportHistoryAsGPX();
          }}
          secondChoiceAction={() => {
            setExportingAll(false);
            exportHistoryAsJSON();
          }}
          cancelAction={() => setExportingAll(false)}
        />
      )}
      {runExportedAsGPX && (
        <DialogueBox
          text="Run has been successfully exported as a GPX file to your download folder."
          cancelAction={() => setRunExportedAsGPX(false)}
        />
      )}
      {runExportedAsJSON && (
        <DialogueBox
          text="Run has been successfully exported as a JSON file to your download folder."
          cancelAction={() => setRunExportedAsJSON(false)}
        />
      )}
      {allRunsExportedAsGPX && (
        <DialogueBox
          text="All runs have been successfully exported as a GPX file to your download folder."
          cancelAction={() => setAllRunsExportedAsGPX(false)}
        />
      )}
      {allRunsExportedAsJSON && (
        <DialogueBox
          text="All runs have been successfully exported as a JSON file to your download folder."
          cancelAction={() => setAllRunsExportedAsJSON(false)}
        />
      )}
      {exportedFail && (
        <DialogueBox
          text="Export failed."
          cancelAction={() => setExportedFail(false)}
        />
      )}
      {clearingSingle && (
        <DialogBoxConfirmCancel
          text="Are you sure you want to delete this run?"
          confirmText="Confirm"
          cancelText="Cancel"
          confirmAction={() => {
            deleteItem(idOfCurrentRun);
            setClearingSingle(false);
          }}
          cancelAction={() => setClearingSingle(false)}
        />
      )}
      {clearingAll && (
        <DialogBoxConfirmCancel
          text="Are you sure you want to delete your running history?"
          confirmText="Confirm"
          cancelText="Cancel"
          confirmAction={() => {
            clearStorage();
            setClearingAll(false);
          }}
          cancelAction={() => setClearingAll(false)}
        />
      )}
    </View>
  );
};

const sortRunsByDate = (years: number[], runs: RunReducedInformation[]) => {
  const runsByDate: any = {};

  //For each year make an object with 12 keys for the months,
  //each of those holds an array of 31 objects, one for each day
  for (const year of years) {
    const yearData: any = {};
    for (let i = 1; i < 13; i++) {
      yearData[i] = new Array(31)
        .fill(0)
        .map((_, idx) => ({distance: 0, time: 0, day: idx + 1}));
    }
    runsByDate[year] = yearData;
  }

  //For each of the unordered runs, go into the object that
  //holds the ordered runs and copy the distance and time into
  //the given run
  for (const run of runs) {
    const entry =
      runsByDate[run.year][parseInt(run.month)][parseInt(run.day) - 1];
    entry.distance = run.distance;
    entry.time = run.time;
  }
  return runsByDate;
};

export default History;
