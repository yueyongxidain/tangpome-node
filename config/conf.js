const conf = {
    port: 7002,
    mysql: {
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "tangpemo"
    },
    qiniu:{
      ak:"aMDZv5nfw4FAd7SKj1NtF3-Z8eClmndPE7drLR7p",
      sk:"OLy8QvMoAFYOAfOBNjmF6vR9KPZUo3NQeOUiTLv2",
      bucket:"tangpome",
      Domain:'http://q6vvxowck.bkt.clouddn.com'
    }
  };
  
  module.exports = conf;
  