let EnvironmentStore = {
  getApiHost: function (name) {
    switch (name) {
      case 'test':
        return 'http://192.168.29.167:6100/api';
      case 'live':
        return 'https://books-backend-7vpe.onrender.com/api';
      default:
        throw 'Unknown Environment.getApiHost: ' + name;
    }
  },
};

export default EnvironmentStore;
