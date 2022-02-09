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
export const mainRedBright = '#ce9db3';
export const mainGreen = '#83c1a5';
export const mainBlue = '#247BA0';
export const mainBlueDark = '#154960';
export const mainBlueBright = '#2fa0d0';
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
    paddingRight: WIDTH / 35,
  },
  logo: {
    transform: [{rotate: '-79deg'}],
    marginTop: HEIGHT / 250,
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
    // borderWidth: WIDTH / 200,
    // borderColor: mainBlue,
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
    padding: WIDTH / 50,
    backgroundColor: mainBlue,
    borderRadius: WIDTH / 2,
    elevation: 10,
  },
  runningStartButtonDisabled: {
    padding: WIDTH / 50,
    backgroundColor: mainBlue,
    borderRadius: WIDTH / 2,
    opacity: 0.5,
  },
  runningStartButtonText: {
    fontSize: WIDTH / 15,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'center',
    color: mainWhite,
    paddingBottom: HEIGHT / 200,
  },
  runningWayPointSection: {
    width: WIDTH / 1.1,
    flex: 5,
    backgroundColor: mediumBlack,
    elevation: 10,
    borderRadius: WIDTH / 40,
    alignItems: 'center',
    paddingBottom: HEIGHT / 40,
    // borderWidth: WIDTH / 200,
    // borderColor: mainBlue,
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
    backgroundColor: mainBlue,
    borderRadius: WIDTH / 2,
    width: WIDTH / 3.1,
    elevation: 5,
  },
  runningControlButtonDisabled: {
    backgroundColor: mainBlue,
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
    backgroundColor: mainBlueDark,
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
  history: {
    flex: 1,
    alignItems: 'center',
  },
  historyEmptyWarning: {
    fontSize: WIDTH / 15,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
    color: mainWhite,
    marginTop: HEIGHT / 30,
  },
  historyListSection: {
    width: standardWidth,
    marginTop: topMargin,
    marginBottom: HEIGHT / 30,
    backgroundColor: mediumBlack,
    borderRadius: WIDTH / 40,
    elevation: 7,
    flex: 8,
    alignItems: 'center',
    paddingBottom: HEIGHT / 50,
    borderWidth: WIDTH / 200,
    borderColor: mainBlue,
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
  historyEntryFrontside: {
    flex: 1,
    justifyContent: 'center',
  },
  historyEntryDate: {
    fontSize: WIDTH / 17,
    fontFamily: 'Quicksand-Bold',
    textAlign: 'center',
    color: mainWhite,
    marginBottom: HEIGHT / 80,
  },
  historyEntryText: {
    fontSize: WIDTH / 20,
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
    color: 'white',
  },
  historyEntryBackside: {
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
  historyEntryButton: {},
  historyEntryButtonText: {
    fontSize: WIDTH / 25,
    fontFamily: 'Quicksand-Regular',
    textAlign: 'center',
    padding: WIDTH / 40,
    color: 'white',
  },
  historyButtonSection: {
    width: standardWidth,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyLowerButtonSection: {
    width: standardWidth,
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyButton: {
    backgroundColor: mainBlue,
    width: standardWidth / 2 - WIDTH / 50,
    height: HEIGHT / 14,
    marginRight: WIDTH / 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: WIDTH / 2,
    margin: WIDTH / 50,
    elevation: 5,
  },
  historyButtonText: {
    fontSize: WIDTH / 28,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'center',
    color: 'white',
    padding: WIDTH / 60,
    marginRight: WIDTH / 40,
  },

  //Popup menu
  popupMenu: {
    position: 'absolute',
    bottom: HEIGHT / 50,
    zIndex: 10,
  },

  // SingleRunGraph
  singleRunGraph: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SingleRunGraphInfoSection: {
    flex: 2.5,
    width: standardWidth,
    backgroundColor: mediumBlack,
    elevation: 10,
    borderRadius: WIDTH / 40,
    padding: WIDTH / 50,
    marginTop: topMargin,
    // borderWidth: WIDTH / 200,
    // borderColor: mainBlue,
  },
  singleRunGraphDateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleRunGraphDateText: {
    fontSize: WIDTH / 15,
    fontFamily: 'Quicksand-Bold',
    color: mainWhite,
    paddingBottom: HEIGHT / 80,
    borderBottomWidth: WIDTH / 200,
    borderBottomColor: mainBlue,
  },
  singleRunGraphStatsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  singleRunGraphStatsText: {
    fontSize: WIDTH / 20,
    fontFamily: 'Quicksand-Medium',
    textAlign: 'center',
    margin: WIDTH / 40,
    color: mainWhite,
  },
  singleRunGraphButtonSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: HEIGHT / 50,
  },
  singleRunGraphSelector: {
    width: WIDTH / 4,
    backgroundColor: mainBlue,
    padding: WIDTH / 25,
    position: 'absolute',
    left: 0,
  },
  singleRunGraphButton: {
    width: WIDTH / 4,
    padding: WIDTH / 25,
  },
  singleRunGraphButtonText: {
    fontSize: WIDTH / 30,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Quicksand-Regular',
  },
  singleRunGraphGraphSection: {
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
    borderWidth: WIDTH / 200,
    borderColor: mainBlue,
  },
  singleRunGraphGraph: {
    height: HEIGHT / 2.3,
    width: WIDTH / 1.2,
  },

  // AllRunsChart
  AllRunsChartDataText: {
    textAlign: 'center',
    fontSize: WIDTH / 25,
    fontFamily: 'Quicksand-Medium',
    color: 'white',
    borderWidth: WIDTH / 150,
    borderRadius: WIDTH / 12.5,
    padding: WIDTH / 40,
    width: standardWidth / 2.1,
    textAlignVertical: 'center',
    backgroundColor: mediumBlack,
  },
  AllRunsChartList: {
    width: standardWidth / 3.5,
  },
  AllRunsChartItem: {
    textAlign: 'center',
    fontSize: WIDTH / 25,
    fontFamily: 'Quicksand-Medium',
    color: 'white',
  },

  // Dialog box
  dialogSection: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    height: HEIGHT,
    width: WIDTH,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogBox: {
    width: WIDTH / 1.05,
    height: HEIGHT / 2.5,
  },
  dialogContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mediumBlack,
    borderRadius: WIDTH / 40,
  },
  dialogMessage: {
    fontSize: WIDTH / 20,
    width: WIDTH / 1.2,
    fontFamily: 'Quicksand-Bold',
    marginBottom: HEIGHT / 30,
    textAlign: 'center',
    color: mainWhite,
  },
  confirmButton: {
    backgroundColor: mainBlue,
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
  firstChoiceButton: {
    backgroundColor: mainBlue,
    width: WIDTH / 2,
    marginTop: HEIGHT / 30,
    padding: WIDTH / 30,
    elevation: 10,
  },
  secondChoiceButton: {
    backgroundColor: mainRed,
    width: WIDTH / 2,
    marginTop: HEIGHT / 60,
    padding: WIDTH / 30,
    elevation: 10,
  },
  decisionButtonText: {
    fontSize: WIDTH / 25,
    fontFamily: 'Quicksand-Regular',
    color: mainWhite,
  },
});
