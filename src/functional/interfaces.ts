export interface MenuProps {
  navigation: any;
}

export interface HistoryProps {
  navigation: any;
}

export interface RunningProps {
  navigation: any;
}

export interface RunningState {
  time: number;
  startTime: Date;
  distance: number;
  timer: any;
  timeRunning: boolean;
  started: boolean;
  currentLocation: LocationLatLong;
  newDistance: number;
  unlocked: boolean;
  backing: boolean;
  runningPath: LocationLatLong[];
  runMeasurements: RunMeasurement[];
  wayPoints: WayPoint[];
  currentWayPoint: number;
  timeToLastWp: number;
  ended: boolean;
}

export interface RunMeasurement {
  distance: number;
  time: number;
  altitude: number;
  speed: number;
}

export interface WayPoint {
  distance: number;
  time: number;
}

export interface LocationLatLong {
  longitude: number;
  latitude: number;
}

export interface StandardButtonProps {
  pressHandler: any;
  text: string;
  buttonStyle: any;
  textStyle: any;
  opacity: number;
}

export interface RunningButtonProps {
  pressHandler: any;
  text: string;
  disabled: boolean;
  buttonStyle: any;
  textStyle: any;
  disabledStyle: any;
}

export interface ListItemProps {
  date: string;
  time: number;
  distance: number;
  y: any;
  index: number;
  exportRun: (id: string) => void;
  visualizeHistory: (id?: string | null) => boolean | undefined;
  deleteItem: (key: string) => Promise<void>;
  navigate: () => void;
}

export interface DialogueBoxWithButtonProps {
  text: string;
  confirmAction: any;
  cancelAction: any;
}

export interface DialogueBoxProps {
  text: string;
  cancelAction: any;
}

export interface Run {
  date: Date;
  time: number;
  distance: number;
  path: LocationLatLong[];
  runMeasurements: RunMeasurement[];
}

export interface Item {
  date: string;
  time: number;
  distance: number;
  path: LocationLatLong[];
  runMeasurements: RunMeasurement[];
}

export interface HistoryMenuProps {
  navigation: any;
  setAllRunsData: any;
  setSingleRunData: any;
}

export interface LockCircleProps {
  unlockedCallback: () => void;
  lockedCallback: () => void;
  started: boolean;
  ended: boolean;
}

export interface BackButtonProps {
  pressHandler: any;
}

export interface ListItemBackButtonProps {
  pressHandler: any;
}

export interface SingleRunData {
  id: string;
  data: RunMeasurement[];
}

interface DataPoint {
  id: string;
  distance: number;
  time: number;
  year: string;
  month: string;
  day: string; 
}

export interface AllRunsData {
  maxYear: number;
  minYear: number;
  years: number[];
  runsByDate: any;
}

export interface SingleRunVisualizer {
  data: SingleRunData;
  navigation: any;
}

export interface AllRunsVisualizer {
  data: AllRunsData;
  navigation: any;
}

export interface RenderItemProps {
  item: Item;
  index: number;
}
