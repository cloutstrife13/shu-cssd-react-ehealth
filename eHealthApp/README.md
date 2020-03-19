## Deploying eHealth application

Prior to deploying the ehealth application, it is important that npm is installed. To do so, cd into the \eHealthApplication\eHealthApp directory and run the following command

```
npm i
```

This will install all the dependencies that are needed to run the application.

To deploy the eHealth application, you need to ensure that you are in the \eHealthApplication\eHealthApp directory and run the following command:

```
ionic serve
```

You might be prompted about if you wish to install react-scripts at which point you should type in 'y' and press enter.
![React-scripts](./MD-Images/ReactScriptsNotInstalled.png)

If the deployment failed and you receive a 'BrowserslistError' error, you will need to delete the following files from the directory: browserslist, browserslist.cmd, browserslist.ps1.
Run the 'ionic serve' command once more and the application should successfully deploy

Once deployed, the application will automatically be displayed on the scrren running on http://localhost:8100/.

## Testing

Prior to running the unit tests, it is important npm is installed. To do so, cd into the \eHealthApplication\eHealthApp directory and run the following command

```
npm install
```

This will install all the dependencies that are needed to run the application.

To run the tests for the eHealth application, you need to ensure that you are in the \eHealthApplication\eHealthApp directory and run the following command:

```
npm test
```

Once the command is ran, all the unit tests will start running with the results being displayed on the console.
