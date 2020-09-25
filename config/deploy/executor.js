const { spawn } = require('child_process');
const dotenv = require('dotenv');
const packageJson = require('../../package.json');
const { getArgs } = require('./get-args');

dotenv.config();
const processArgs = getArgs();
const betaTag = process.env.TAG;
const releaseTag = packageJson.version;

const { beta } = processArgs;

const deployTag = beta ? betaTag : releaseTag;

try {
  spawn('bash ', [`config/deploy/deploy-script.sh ${deployTag}`], {
    shell: true,
    stdio: 'inherit',
  });
} catch (error) {
  console.error(error);
}
