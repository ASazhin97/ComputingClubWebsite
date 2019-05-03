angular
    .module('members', [])
    .controller('MembersController', ['$http', MembersController]);

function MembersController($http){
  console.log('members page');
  const vm = this;

  vm.users = [];

  function getAllMembers(){
        $http.get('/members').then(
        res => {
          vm.users = res.data;
        },
        err => {
          console.log(err);
        }
    );
  }

  // Call on page load
  getAllMembers();

  // Responsible for adding member to the database
  vm.addMember = function(member){
    const body = {};
    body.member = member;

    $http.post('/members', body).then(
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
