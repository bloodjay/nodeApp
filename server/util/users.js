[{
    id:'/#12poiajds',
    name:'Jiayi',
    room:'Office KK'
}]

// class Person {
//   constructor(name,age){
//   this.name = name;
//   this.age = age
//   }
//   getUserDescription(){
//       return this.name+'is'+this.age+'year(s) old';
//   }
// }

// var me = new Person('Jiayi',30);

class Users {
    constructor(){
        this.users = [];
    }
    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
       var user = this.getUser(id);
       if(user)
       this.users = this.users.filter((users) => users.id!==id)
       return user;
    }
    getUser(id){
       return this.users.filter(users => users.id === id)[0]
    }
    getUserList(room){
      var users =  this.users.filter((users) => {
          return users.room === room;
      })
      var nameArray = users.map(users => users.name)
      return nameArray;
    }
}

module.exports = {Users}