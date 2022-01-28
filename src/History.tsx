import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View, Text, Animated} from 'react-native';
import {
  AllRunsData,
  HistoryMenuProps,
  HistoryProps,
  Item,
  RenderItemProps,
  SingleRunData,
} from './functional/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  backgroundBlack,
  mainBlueDark,
  mainRedDark,
  styles,
} from './styles/styles';
import * as RNFS from 'react-native-fs';
import {gpxParser} from './functional/gpxParser';
import {VisualizerSingleRun} from './components/Visualizer';
import {extractYearMonthDay} from './functional/functions';
import {createStackNavigator} from '@react-navigation/stack';
import {DialogueBox, DialogueBoxWithButtons} from './components/DialogueBoxes';
import {BackButton, StandardButton} from './components/Buttons';
import {ListItem} from './components/ListItem';
import PopupMenu from './components/PopupMenu';
import LoadingCircle from './components/LoadingCircle';
import {DeleteIcon, ExportIcon, VisualizationIcon} from './components/Icons';
import Chart from './components/Chart';
import Gradient from './components/Gradient';

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
        {props => <VisualizerSingleRun {...props} data={singleRunData} />}
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
  const [runs, setRuns] = useState<Item[]>([]);
  const [clearing, setClearing] = useState(false);
  const [exported, setExported] = useState(false);
  const [exportedFail, setExportedFail] = useState(false);
  const [allRunsExported, setAllRunsExported] = useState(false);
  const [loading, setLoading] = useState(false);

  const y = useRef(new Animated.Value(0)).current;

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
    const runs: Item[] = [];
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
      setClearing(false);
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

  const exportRun = (id: string) => {
    const currentRun = getRunFromRunsById(id);
    if (currentRun) {
      const path = currentRun.path;
      if (path.length > 0) {
        const gpx = gpxParser([currentRun]);
        id = id
          .split('')
          .map((char: string) => (char !== ':' ? char : '_'))
          .join('');

        RNFS.write(
          RNFS.DownloadDirectoryPath + `/run_${id}.gpx`,
          gpx,
          undefined,
          'ascii',
        )
          .then(res => {
            setExported(true);
          })
          .catch(err => {
            console.log(err);
            setExportedFail(true);
          });
      }
    }
  };

  const exportHistory = () => {
    if (runs.length === 0) {
      return;
    }
    const gpx = gpxParser(runs);
    RNFS.write(
      RNFS.DownloadDirectoryPath + `/all_runs.gpx`,
      gpx,
      undefined,
      'ascii',
    )
      .then(res => {
        setAllRunsExported(true);
      })
      .catch(err => {
        console.log(err);
        setExportedFail(true);
      });
  };

  const visualizeHistory = (id: string | null = null) => {
    if (runs.length === 0) {
      return false;
    }
    if (id) {
      const run: Item | undefined = getRunFromRunsById(id);
      if (run) {
        if (run.runMeasurements.length === 0) {
          return false;
        }
        const data: SingleRunData = {id: id, data: run.runMeasurements};
        props.setSingleRunData(data);
        return true;
      }
    } else {
      const years: number[] = [];
      const runData = runs.map((run: Item) => {
        const [year, month, day] = extractYearMonthDay(run.date);
        years.push(parseInt(year));
        return {
          distance: run.distance,
          time: run.time,
          year: year,
          month: month,
          day: day,
        };
      });
      const runsByDate = sortRunsByDate(years, runData);
      const data: AllRunsData = {
        maxYear: Math.max(...years.map(year => year)),
        minYear: Math.min(...years.map(year => year)),
        years: [...new Set(years)],
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
        y={y}
        index={index}
        exportRun={exportRun}
        visualizeHistory={visualizeHistory}
        deleteItem={deleteItem}
        navigate={navigateToSingleRunHistory}
      />
    );
  };

  return (
    <View style={styles.historySection}>
      <Gradient color1={mainBlueDark} color2={backgroundBlack} />
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
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: y}}}], {
            useNativeDriver: true,
          })}
        />
      </View>
      <PopupMenu>
        <View style={styles.historyButtonContainer}>
          <StandardButton
            pressHandler={() => {
              exportHistory();
            }}
            text="Export History"
            buttonStyle={styles.historyButton}
            textStyle={styles.historyButtonText}
            opacity={0.5}
          />
          <ExportIcon />
        </View>
        <View style={styles.historyButtonContainer}>
          <StandardButton
            pressHandler={() => {
              if (visualizeHistory()) {
                props.navigation.navigate('AllRunsChart');
              }
            }}
            text="Visualize History"
            buttonStyle={[styles.historyButton]}
            textStyle={styles.historyButtonText}
            opacity={0.5}
          />
          <VisualizationIcon />
        </View>
        <View style={styles.historyButtonContainer}>
          <StandardButton
            pressHandler={() => setClearing(!clearing)}
            text="Clear History"
            buttonStyle={[styles.historyButton]}
            textStyle={styles.historyButtonText}
            opacity={0.5}
          />
          <DeleteIcon />
        </View>
      </PopupMenu>
      <View style={styles.backSection}>
        <BackButton pressHandler={goBack} />
      </View>
      {exported && (
        <DialogueBox
          text="Run has been successfully exported as a gpx file to your download folder!"
          cancelAction={() => setExported(false)}
        />
      )}
      {exportedFail && (
        <DialogueBox
          text="Export failed!"
          cancelAction={() => setExportedFail(false)}
        />
      )}
      {allRunsExported && (
        <DialogueBox
          text="All runs have been successfully exported as a gpx file to your download folder!"
          cancelAction={() => setAllRunsExported(false)}
        />
      )}
      {clearing && (
        <DialogueBoxWithButtons
          text="Are you sure you want to delete you running history?"
          confirmAction={() => clearStorage()}
          cancelAction={() => setClearing(false)}
        />
      )}
    </View>
  );
};

const sortRunsByDate = (years: number[], runs: any) => {
  const runsByDate: any = {};
  for (const year of years) {
    const yearData: any = {};
    for (let i = 1; i < 13; i++) {
      yearData[i] = new Array(31)
        .fill(0)
        .map((_, idx) => ({distance: 0, time: 0, day: idx + 1}));
    }
    runsByDate[year] = yearData;
  }
  for (const run of runs) {
    const temp =
      runsByDate[run.year][parseInt(run.month)][parseInt(run.day) - 1];
    temp.distance = run.distance;
    temp.time = run.time;
  }
  return runsByDate;
};

export default History;
