import {Item} from './interfaces';

export const gpxParser = (runs: Item[]) => {
  const firstLine = '<?xml version="1.0" encoding="UTF-8"?>';
  const secondLine =
    '\n<gpx creator="Running App" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">';
  const metaData = '\n  <metadata>\n    <name>All Runs</name>\n  </metadata>';
  const lastLine = '\n</gpx>';

  let runData = '';

  for (const run of runs) {
    let track = `\n  <trk>\n    <time>${run.date}</time>\n    <trkseg>`;
    for (const location of run.path) {
      track += `\n      <trkpt lat=\"${location.latitude}\" lon=\"${location.longitude}\"></trkpt>`;
    }
    track += '\n    </trkseg>\n  </trk>';
    runData += track;
  }

  const gpx = firstLine + secondLine + metaData + runData + lastLine;
  return gpx;
};
