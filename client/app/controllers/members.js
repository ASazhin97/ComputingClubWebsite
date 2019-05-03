angular
    .module('members', [])
    .controller('MembersController', ['$http', MembersController])
    .directive('fileread', FileRead);

function FileRead(){
  return {
    scope: {
      fileread: '=',
    },
    link: function(scope, element, attributes){
      element.bind('change', changeEvent => {
        const reader = new FileReader();
        reader.onload = function(loadEvent){
          scope.$apply(() => {
            scope.fileread = loadEvent.target.result;
          });
        };
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    },
  };
}

function MembersController($http){
  console.log('members page');
  const vm = this;

  vm.officers = [];
  vm.professors = [];
  vm.members = [];

  // get officers from database
  function getOfficers(){
    $http.get('/members/role/officer').then(
        res => {
          vm.officers = res.data;
        },
        err => {
          console.log(err);
        }
    );
  }

  // get professors from database
  function getProfessors(){
    $http.get('/members/role/professor').then(
        res => {
          vm.professors = res.data;
        },
        err => {
          console.log(err);
        }
    );
  }

  // get members from database
  function getMembers(){
    $http.get('/members/role/member').then(
        res => {
          vm.members = res.data;
        },
        err => {
          console.log(err);
        }
    );
  }

  function getAllMembers(){
    getOfficers();
    getProfessors();
    getMembers();
  }

  // Call on page load
  getAllMembers();

  // Responsible for adding member to the database
  vm.addMember = function(member){
    const body = {};
    body.member = member;

    const file = vm.file;
    const fData = new FormData();
    // TODO: Send file and member details to different routes?
    fData.append('profile', file);

    $http.post('/members', body, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined},
    }).then(
        res => {
          console.log('Successfully Added Member');
          getAllMembers();
        },
        err => {
          console.log(err);
        }
    );
  };

  // Responsible for deleting a member from the database
  vm.deleteMember = function(member){
    $http.delete(`/members/${member._id}`).then(
        res => {
          getAllMembers();
        },
        err => {
          console.log(err);
        }
    );
  };
}
