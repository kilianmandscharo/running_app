// ============================================= //
// Menu
export interface MenuProps {
  navigation: any;
}

// ============================================= //
// Running
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
  locationDialogEnabled: boolean;
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

export interface Run {
  date: Date;
  time: number;
  distance: number;
  path: LocationLatLong[];
  runMeasurements: RunMeasurement[];
}

// ============================================= //
// History
export interface HistoryProps {
  navigation: any;
}

export interface RunReducedInformation {
  distance: number;
  time: number;
  year: string;
  month: string;
  day: string;
}

export interface RunFullInformation {
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

export interface AllRunsData {
  maxYear: number;
  minYear: number;
  years: number[];
  runsByDate: any;
}

export interface SingleRunData {
  id: string;
  data: RunMeasurement[];
}

// ============================================= //
// SingleRunGraph 
export interface SingleRunGraphProps {
  data: SingleRunData;
  navigation: any;
}

// ============================================= //
// AllRunsChart 
export interface AllRunsChartProps {
  allRunsData: AllRunsData;
  navigation: any;
}

// ============================================= //
// Components 
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

export interface BackButtonProps {
  pressHandler: any;
}

export interface ListItemProps {
  date: string;
  time: number;
  distance: number;
  index: number;
  exportRun: () => void;
  deleteRun: () => void;  
  setIdOfCurrentRun: React.Dispatch<React.SetStateAction<string>>;
  visualizeSingleRun: (id: string) => boolean;
  navigate: () => void;
}

export interface ListItemBackButtonProps {
  pressHandler: any;
}

export interface RenderItemProps {
  item: RunFullInformation;
  index: number;
}

export interface DialogueBoxProps {
  text: string;
  cancelAction: any;
}

export interface DialogBoxConfirmCancelProps {
  text: string;
  confirmText: string;
  cancelText: string;
  confirmAction: any;
  cancelAction: any;
}

export interface DialogBoxThreeButtonsProps {
  text: string;
  firstChoiceText: string;
  secondChoiceText: string;
  cancelText: string;
  firstChoiceAction: any;
  secondChoiceAction: any;
  cancelAction: any;
}

export interface HistoryButtonProps {
  pressHandler: any;
  text: string;
  buttonStyle: any;
  textStyle: any;
  opacity: number;
  children: any;
}

export interface LockCircleProps {
  unlockedCallback: () => void;
  lockedCallback: () => void;
  started: boolean;
  ended: boolean;
}