/*const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
*/

const {app, BrowserWindow} = require('electron')

const {spawn} = require('child_process')

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow



function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
	  //fullscreen: true,
	  //frame: false,
	  //kiosk: true,
      webPreferences: {
          //kiosk: true,
          //session: null,
          nodeIntegration: false
      }
  });

	mainWindow.maximize();


  var session = mainWindow.webContents.session;
  if(session)
    session.clearStorageData([]);

  //mainWindow.setMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: 'csteps.education.illinois.edu/',
    protocol: 'http:',
    slashes: true
  }));

	// spawn ffmpeg
	var now = new Date(),
		day = now.getDate(),
		month = now.getMonth() + 1,
		year = now.getFullYear(),
		hour = now.getHours(),
		minute = now.getMinutes(),
		second = now.getSeconds(),
		datestring = "" + day + "-" + month + "-" + year + "_" + hour + "." + minute + "." + second;
	var output_file = path.join(__dirname, "audio", "audio_" + datestring + ".flac");
	
	var ffmpeg = spawn(	
		path.join(__dirname, 'ffmpeg.exe'), 
		[
			'-f', 'dshow',
			'-i', 'audio=Microphone Array (Realtek High Definition Audio(SST))',
			output_file
		]
	);

	var printbuffer = function(d) {
		console.log(d.toString());
	};
	
	ffmpeg.stdout.on('data', printbuffer);
	ffmpeg.stderr.on('data', printbuffer);
	ffmpeg.on('close', function(code) {
		console.log("ffmpeg exited with code " + code);
	});

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
	  // TODO kill ffmpeg
		
	  ffmpeg.kill('SIGINT');

	  console.log("killed ffmpeg");
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });


}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  //if (mainWindow === null) {
    createWindow()
  //}
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
