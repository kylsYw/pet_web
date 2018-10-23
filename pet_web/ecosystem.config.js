module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'react-note',
      script    : './bin/www',
      instances : 4,
      exec_mode : 'cluster',
      max_memory_restart: "300M",
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'root',                        //# 也可以useradd另建用户
      host : '120.79.90.200',                 //# 服务器地址
      ref  : 'origin/master',
      repo : 'https://gitee.com/kyls/react_pet_web.git',    //# github上的项目地址
      path : '/pet_web',     //# 服务器上放项目的目录
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js --env production'
    },
    dev : {
      user : 'alex',
      host : '127.0.0.1',
      ref  : 'origin/master',
      repo : 'git@github.com:alex-my/react-note.git',
      path : '/Code/nodejs/dev',
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};