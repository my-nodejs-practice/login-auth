const users = [
  { id: 1, username: 'zhangsan', password: 'abc123123', age: 18, job: 'front-end engineer' },
  { id: 2, username: 'lisi', password: 'abc123123', age: 20, job: 'back-end engineer' },
  { id: 3, username: 'wangwu', password: 'abc123123', age: 28, job: 'ios engineer' },
];

function find({ username, password }) {
  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    if (u.username === username && u.password === password) {
      return u;
    }
  }
  return null;
}

function findById(id) {
  for (let i = 0; i < users.length; i++) {
    const u = users[i];
    if (u.id === Number(id)) {
      return u;
    }
  }
  return null;
}

module.exports = {
  find,
  findById,
};
