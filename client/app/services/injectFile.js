angular
    .module('computingClubApp')
    .factory('InjectFileService', ['$document', InjectFileService]);

// TODO: use promises
function InjectFileService($document){
  const head = $document.find('head');
  const body = $document.find('body');

  const injectFile = {};

  function elementExists(id){
    const element = $document.find(`#${id}`);
    return element.length > 0;
  }

  injectFile.set = function(type, url, id){
    if (!elementExists(id)){
      if (type === 'css'){
        const link = $document[0].createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.id = id;
        head.append(link);
      }
      if (type === 'js'){
        const script = $document[0].createElement('script');
        script.src = url;
        script.id = id;
        body.append(script);
      }
    }
  };

  return injectFile;
}
