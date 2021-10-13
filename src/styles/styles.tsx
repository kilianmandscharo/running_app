import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

const topMargin = HEIGHT / 30;

export const entryHeight = HEIGHT / 6;

export const backgroundBlack = '#121212';
export const mediumBlack = '#262626';
export const elevatedBlack = '#393939';
export const mainRed = '#C1839F';
export const mainRedDark = '#60414f';
export const mainGreen = '#83c1a5';
export const mainBlue = '#247BA0';
export const mainBlueDark = '#154960';
export const mainWhite = 'rgba(255, 255, 255, 0.87)';

export const standardWidth = WIDTH / 1.1;
const radius = WIDTH / 8;

export const styles = StyleSheet.create({
  // App
  app: {
    flex: 1,
  },

  // Main menu
  headerSection: {
    flex: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logo: {
    transform: [{rotate: '-80deg'}],
    // position: 'absolute',
    // top: HEIGHT / 11.2,
    // left: -WIDTH / 20,
  },
  header: {
    fontSize: WIDTH / 5.5,
    fontFamily: 'FugazOne-Regular',
    textAlign: 'center',
    marginTop: topMargin,
    marginLeft: WIDTH / 15,
    color: mainWhite,
  },
  menu: {
    flex: 1,
    alignItems: 'center',
  },
  menuButtonSection: {
    flex: 9,
    alignItems: 'center',
  },
  menuButton: {
    marginBottom: HEIGHT / 30,
    marginTop: HEIGHT / 30,
    backgroundColor: mainBlueDark,
    width: WIDTH / 2,
    height: WIDTH / 2,
    borderRadius: WIDTH / 4,
    borderColor: mainBlue,
    borderWidth: WIDTH / 45,
    elevation: 20,
  },
  menuButtonText: {
    textAlign: 'center',
    fontSize: WIDTH / 16,
    fontFamily: 'Quicksand-Medium',
    color: mainWhite,
    transform: [{translateY: WIDTH / 5.5}],
  },

  // Running section
  runningSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  runningDataSection: {
    flex: 1.5,
    width: standardWidth,
    backgroundColor: mediumBlack,
    borderRadius: WIDTH / 40,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: topMargin,
  },
  runningDataSectionText: {
    fontSize: WIDTH / 11,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'center',
    color: mainWhite,
    width: WIDTH / 2.2,
  },
  runningStartSection: {
    flex: 2,
    justifyContent: 'center',
    width: standardWidth,
  },
  runningStartButton: {
    padding: WIDTH / 80,
    backgroundColor: mediumBlack,
    borderColor: mainRed,
    borderWidth: WIDTH / 100,
    borderRadius: WIDTH / 2,
    elevation: 10,
  },
  runningStartButtonDisabled: {
    padding: WIDTH / 80,
    backgroundColor: mediumBlack,
    borderColor: mainRed,
    borderWidth: WIDTH / 100,
    borderRadius: WIDTH / 2,
    opacity: 0.5,
  },
  runningStartButtonText: {
    fontSize: WIDTH / 15,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'center',
    color: mainWhite,
  },
  runningWayPointSection: {
    width: WIDTH / 1.1,
    flex: 5,
    backgroundColor: mediumBlack,
    elevation: 10,
    borderRadius: WIDTH / 40,
    alignItems: 'center',
    paddingBottom: HEIGHT / 40,
  },
  runningWayPointSectionHeader: {
    fontSize: WIDTH / 15,
    fontFamily: 'Quicksand-Bold',
    color: mainWhite,
    marginBottom: HEIGHT / 50,
    padding: WIDTH / 50,
  },
  runningWayPointEntry: {
    fontSize: WIDTH / 20,
    fontFamily: 'Quicksand-Regular',
    color: mainWhite,
    margin: WIDTH / 50,
  },
  runningControlSection: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: standardWidth,
    marginTop: HEIGHT / 40,
    marginBottom: HEIGHT / 40,
  },
  runningControlButton: {
    backgroundColor: mediumBlack,
    borderColor: mainRed,
    borderWidth: WIDTH / 100,
    borderRadius: WIDTH / 2,
    width: WIDTH / 3.1,
    elevation: 5,
  },
  runningControlButtonDisabled: {
    backgroundColor: mediumBlack,
    borderColor: mainRed,
    borderWidth: WIDTH / 100,
    borderRadius: WIDTH / 2,
    width: WIDTH / 3.1,
    opacity: 0.3,
  },
  runningControlButtonText: {
    textAlign: 'center',
    fontSize: WIDTH / 18,
    fontFamily: 'Quicksand-Medium',
    color: mainWhite,
    padding: WIDTH / 40,
  },
  lock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    position: 'absolute',
    top: radius - WIDTH / 17,
    left: radius - WIDTH / 30,
  },
  lockShackle: {
    width: WIDTH / 18,
    height: HEIGHT / 40,
    backgroundColor: 'transparent',
    borderTopStartRadius: WIDTH / 7,
    borderTopEndRadius: WIDTH / 7,
    borderColor: backgroundBlack,
    borderWidth: WIDTH / 100,
    position: 'absolute',
    bottom: HEIGHT / 35,
  },
  lockBody: {
    backgroundColor: backgroundBlack,
    width: WIDTH / 15,
    height: WIDTH / 15,
    borderRadius: WIDTH / 100,
    marginTop: HEIGHT / 50,
  },
  keyWay: {
    width: WIDTH / 80,
    height: WIDTH / 80,
    backgroundColor: mainWhite,
    borderRadius: WIDTH / 40,
    position: 'absolute',
    top: HEIGHT / 30,
  },
  lockCircle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Back section
  backSection: {
    flex: 1,
    width: WIDTH,
    justifyContent: 'center',
    backgroundColor: mediumBlack,
    paddingLeft: WIDTH / 50,
    borderTopLeftRadius: WIDTH / 40,
    borderTopRightRadius: WIDTH / 40,
    elevation: 3,
  },

  // Arrow
  arrowContainer: {
    flex: 1,
    width: WIDTH / 10,
    height: WIDTH / 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // History section
  historySection: {
    flex: 1,
    alignItems: 'center',
  },
  historyEmptyWarning: {
    fontSize: WIDTH / 15,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
    color: 'black',
    marginTop: HEIGHT / 30,
  },
  historyListSection: {
    width: standardWidth,
    marginTop: topMargin,
    marginBottom: HEIGHT / 12,
    backgroundColor: mediumBlack,
    borderRadius: WIDTH / 40,
    elevation: 7,
    flex: 10.5,
    alignItems: 'center',
    paddingBottom: HEIGHT / 50,
  },
  historyEntry: {
    height: entryHeight,
    width: WIDTH / 1.2,
    marginTop: HEIGHT / 80,
    marginBottom: HEIGHT / 80,
    borderRadius: WIDTH / 40,
    elevation: 5,
    overflow: 'hidden',
    backgroundColor: elevatedBlack,
  },
  historyEntryDate: {
    fontSize: WIDTH / 17,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
    color: mainRed,
  },
  historyEntryText: {
    fontSize: WIDTH / 20,
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
    color: 'white',
    margin: WIDTH / 40,
  },
  historyEntryButtonSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'absolute',
    transform: [{rotateY: '180deg'}],
  },
  historyEntryButtonContainer: {
    flex: 5,
  },
  historyEntryBackButton: {
    height: entryHeight,
    backgroundColor: mainRed,
  },
  historyEntryMenuButton: {
    flex: 1,
  },
  historyEntryMenuButtonText: {
    fontSize: WIDTH / 25,
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
    padding: WIDTH / 50,
    color: 'white',
  },
  historyButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyButton: {
    padding: WIDTH / 40,
  },
  historyButtonText: {
    fontSize: WIDTH / 22,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'center',
    color: 'white',
    padding: WIDTH / 60,
  },

  //Popup menu
  popupMenu: {
    position: 'absolute',
    bottom: HEIGHT / 50,
    zIndex: 10,
  },

  // Single run visualizer
  singleRunVisualizingSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  singleRunDisplaySection: {
    flex: 2.5,
    width: standardWidth,
    backgroundColor: mediumBlack,
    elevation: 10,
    borderRadius: WIDTH / 40,
    padding: WIDTH / 50,
    marginTop: topMargin,
  },
  singleRunDateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleRunDateText: {
    fontSize: WIDTH / 15,
    fontFamily: 'Quicksand-Bold',
    color: mainWhite,
  },
  singleRunDisplayContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  singleRunDisplayText: {
    fontSize: WIDTH / 20,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'center',
    margin: WIDTH / 40,
    color: mainWhite,
  },
  singleRunVisualizingButtonSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: HEIGHT / 50,
  },
  singleRunVisualizingSelection: {
    width: WIDTH / 4,
    backgroundColor: '#247BA0',
    padding: WIDTH / 25,
    position: 'absolute',
    left: 0,
  },
  singleRunVisualizingButton: {
    width: WIDTH / 4,
    padding: WIDTH / 25,
  },
  singleRunVisualizingButtonText: {
    fontSize: WIDTH / 30,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Quicksand-Regular',
  },
  singleRunChartSection: {
    flex: 7,
    backgroundColor: mediumBlack,
    elevation: 10,
    borderRadius: WIDTH / 40,
    padding: WIDTH / 40,
    width: standardWidth,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: HEIGHT / 50,
    marginBottom: HEIGHT / 50,
  },
  singleRunChart: {
    height: HEIGHT / 2.3,
    width: WIDTH / 1.2,
  },

  // All runs visualizer
  allRunsVisualizingSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  allRunsDisplaySection: {
    marginTop: topMargin,
    backgroundColor: 'white',
    width: standardWidth,
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: WIDTH / 40,
    elevation: 10,
  },
  allRunsDisplayText: {
    fontSize: WIDTH / 25,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'center',
    color: 'black',
    padding: WIDTH / 40,
  },
  allRunsChartButtonSection: {
    flex: 1,
    flexDirection: 'row',
    marginTop: HEIGHT / 40,
  },
  allRunsButtonSelection: {
    backgroundColor: '#247BA0',
    position: 'absolute',
    padding: WIDTH / 50,
    width: WIDTH / 5,
    height: HEIGHT / 18,
  },
  allRunsChartButton: {
    padding: WIDTH / 50,
    width: WIDTH / 5,
  },
  allRunsChartButtonText: {
    fontSize: WIDTH / 30,
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
    color: 'white',
  },
  allRunsWarning: {
    position: 'absolute',
    top: '30%',
  },
  allRunsWarningText: {
    fontSize: WIDTH / 12,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
  },
  allRunsChartSection: {
    flex: 5,
    marginTop: HEIGHT / 100,
    backgroundColor: 'white',
    borderRadius: WIDTH / 40,
    padding: WIDTH / 40,
    width: standardWidth,
    elevation: 10,
    alignItems: 'center',
  },
  allRunsChart: {
    height: HEIGHT / 3,
    width: WIDTH / 1.2,
  },
  allRunsYearMonthSection: {
    flex: 1,
    marginTop: HEIGHT / 50,
    width: standardWidth,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  allRunsYearMonthText: {
    width: WIDTH / 8,
    textAlign: 'center',
    fontSize: WIDTH / 25,
    fontFamily: 'Quicksand-Regular',
    color: 'white',
  },
  allRunsArrowLeft: {
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: WIDTH / 25,
    borderRightColor: '#247BA0',
    borderRightWidth: WIDTH / 15,
    borderBottomColor: 'transparent',
    borderBottomWidth: WIDTH / 25,
    marginRight: WIDTH / 40,
  },
  allRunsArrowRight: {
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: WIDTH / 25,
    borderLeftColor: '#247BA0',
    borderLeftWidth: WIDTH / 15,
    borderBottomColor: 'transparent',
    borderBottomWidth: WIDTH / 25,
    marginLeft: WIDTH / 40,
  },
  allRunsTotalSection: {
    flex: 2,
    flexDirection: 'row',
    width: standardWidth,
    marginTop: HEIGHT / 100,
    marginBottom: HEIGHT / 50,
  },
  allRunsTotalElement: {
    backgroundColor: 'white',
    borderRadius: WIDTH / 60,
    elevation: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: WIDTH / 50,
  },
  allRunsTotalHeader: {
    fontSize: WIDTH / 25,
    fontFamily: 'Quicksand-Bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: -HEIGHT / 35,
  },
  allRunsTotalText: {
    fontSize: WIDTH / 30,
    fontFamily: 'Quicksand-Regular',
    color: 'black',
    textAlign: 'center',
    margin: WIDTH / 50,
    width: WIDTH / 3,
  },

  // Dialogue box
  dialogueSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    height: HEIGHT,
    width: WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogueBox: {
    width: WIDTH / 1.05,
    height: HEIGHT / 2.5,
  },
  dialogueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mediumBlack,
    borderRadius: WIDTH / 40,
  },
  dialogueMessage: {
    fontSize: WIDTH / 20,
    width: WIDTH / 1.2,
    fontFamily: 'Quicksand-Bold',
    marginBottom: HEIGHT / 30,
    textAlign: 'center',
    color: mainWhite,
  },
  confirmButton: {
    backgroundColor: mainRed,
    width: WIDTH / 2,
    marginTop: HEIGHT / 50,
    padding: WIDTH / 30,
    elevation: 10,
  },
  cancelButton: {
    backgroundColor: elevatedBlack,
    width: WIDTH / 2,
    marginTop: HEIGHT / 30,
    padding: WIDTH / 30,
    elevation: 10,
  },
  decisionButtonText: {
    fontSize: WIDTH / 30,
    fontFamily: 'Quicksand-Regular',
    color: mainWhite,
  },
});
