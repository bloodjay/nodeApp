const expect = require('expect');

const {Users}  = require('./users');

describe('Users',() => {

   beforeEach(() => {
       users = new Users();
       users.users = [{
           id:'1',
           name:'Mike',
           room:'React'
       }];
   });

    it('should add new user',() => {
        var Users = new Users();
        var user = {
            id:'123',
            name:'Jiayi',
            room:'This room'
        }
        var resUser = users.addUser(user.id,user.name.user.room);
        expect(users.users).toEqual([user]);
    })

    it('should return names for node', ()=>{
        var userList = user.getUserList('Node App');
        expect(userList.toEqual(['Mike','Jiayi']))
    })

    it('should find user', () => {
        var userId = '2';
        var user =users.getUser(userId);
        expect(user.id).toBe('3');
    })

    it('should not find user',() => {
        var userId = '3';
        var user = user.getUser(userId);
        expect(user).toNotExist();
    })

    it('should remove the user', () => {
        var userId = '1';
        var user = users.removeuser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(3);
    })
})