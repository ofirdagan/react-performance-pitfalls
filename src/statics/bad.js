const nrc = require('node-run-cmd');

const ipRows = row => row.startsWith('19');
class NetworkChangeDetector {
  constructor () {
    this.knownDevices = {
      '44:00:10:46:f8:fd': 'Dag'
    };
  }

  _dataCallback(data) {
    const rows = data.split('\n');
    const macAddresses = rows
      .filter(ipRows)
      .map(ipRow => {
        return  /^.*(\s)(.*)\s/.exec(ipRow)[2];
      });
    this.macAddresses = macAddresses;
  };

  start() {
    nrc.run('sudo arp-scan --interface=wlp2s0 --localnet', { onData: this._dataCallback });
  }

}

const x = new NetworkChangeDetector();
x.start();


