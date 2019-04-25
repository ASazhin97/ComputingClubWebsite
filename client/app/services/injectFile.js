angular
    .module('computingClubApp')
    .factory('InjectFileService', ['$document', InjectFileService]);

// TODO: use promises
function InjectFileService($document){
  const injectFile = {};

  injectFile.set = function(type, url){
    if (type === 'css'){
      const link = document.createElement('link');
      link.href = url;
      link.rel = 'stylesheet';
      document.head.append(link);
    }
    if (type === 'js'){
      const script = document.createElement('script');
      script.src = url;
      document.head.append(script);
    }
  };

  return injectFile;
}
