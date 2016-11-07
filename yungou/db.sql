

CREATE TABLE `go_user` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `email` varchar(50) DEFAULT NULL COMMENT '用户邮箱',
  `mobile` char(11) DEFAULT NULL COMMENT '用户手机',
  `password` char(32) DEFAULT NULL COMMENT '密码',
  `user_ip` varchar(255) DEFAULT NULL COMMENT '用户IP地址',
  `img` varchar(255) DEFAULT NULL COMMENT '用户头像',
  `qianming` varchar(255) DEFAULT NULL COMMENT '用户签名',
  `money` decimal(10,2) unsigned DEFAULT '0.00' COMMENT '账户金额',
  `score` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '积分',
  `emailcode` char(21) DEFAULT '-1' COMMENT '邮箱认证码',
  `mobilecode` char(21) DEFAULT '-1' COMMENT '手机认证码',
  `passcode` char(21) DEFAULT '-1' COMMENT '找会密码认证码',
  `reg_key` varchar(100) DEFAULT NULL COMMENT '注册参数',
  `jingyan` int(10) unsigned DEFAULT '0' COMMENT '经验值',
  `first_touzhu` tinyint(1)  unsigned  DEFAULT '0' COMMENT '是否第一次投注',
  `addtime` int(10) unsigned DEFAULT NULL DEFAULT '0' COMMENT '注册时间',
  `last_login_time` int(10) unsigned DEFAULT '0' COMMENT '最近登录时间',
  `auto_user` tinyint(4) DEFAULT '0' COMMENT '是否机器人',
  PRIMARY KEY (`uid`),
  KEY `mobile` (`mobile`)

) ENGINE=InnoDB AUTO_INCREMENT=100000000 DEFAULT CHARSET=utf8 COMMENT='用户表';


CREATE TABLE `go_goods` (
    `goods_id` int(10)  unsigned NOT NULL AUTO_INCREMENT,
    `goods_name` varchar(20) NOT NULL COMMENT '商品名称',
    `goods_desc` varchar(20) NOT NULL COMMENT '商品描述',
    `thumb` varchar(255) NOT NULL COMMENT '缩略图',
    `goods_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品价格',
    `zongrenshu`  int(10) unsigned NOT NULL DEFAULT '0' COMMENT '总需投注人数',
    `is_real` tinyint(1) unsigned DEFAULT '0'  COMMENT '是否虚拟商品',
    `is_on_sale` tinyint(1) unsigned DEFAULT '0' COMMENT '是否上架',
    `sort` smallint(5) '0' unsigned DEFAULT '0' COMMENT '商品排序',
    `last_update` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最近更新时间',
    `goods_cate_id`  smallint(5)  unsigned  DEFAULT '0' COMMENT '商品分类id',
    PRIMARY KEY (`goods_id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品表';


CREATE TABLE `go_chou_jiang` (

    `cj_id` int(10)  unsigned NOT NULL AUTO_INCREMENT,
    `goods_id` int(10)  unsigned NOT NULL COMMENT '商品id，关联go_goods表',
    `qi_shu` int(10) unsigned NOT NULL COMMENT '当前抽奖期数',
    `maxqishu` int(10) unsigned NOT NULL COMMENT '最大抽奖期数',
    `zongrenshu`  int(10) unsigned NOT NULL DEFAULT '0' COMMENT '总需投注人数',
    `canyurenshu`  int(10) unsigned NOT NULL DEFAULT '0' COMMENT '已参与人数',
    `shenyurenshu`  int(10) unsigned NOT NULL DEFAULT '0' COMMENT '已参与人数',
    `jx_status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '揭晓状态,0未揭晓，1揭晓中，2已揭晓',
    `zhongjiama`  varchar(256) NOT NULL DEFAULT '' COMMENT '中奖的云购码',
    `jx_time` int(10) unsigned NOT NULL COMMENT '揭晓时间',
    `addtime` int(10) unsigned NOT NULL COMMENT '抽奖开始时间',
    PRIMARY KEY (`cj_id`),

)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='抽奖表';


CREATE TABLE `go_order` (
    
    `order_id` int(10)  unsigned NOT NULL AUTO_INCREMENT,
    `order_sn` varchar(64) NOT NULL COMMENT '订单唯一号',
    `cj_id` int(10)  unsigned NOT NULL COMMENT '抽奖id，关联go_chou_jiang表',
    `uid` int(10) unsigned NOT NULL COMMENT '用户id，关联go_user表',
    `touzhurenci` int(10) unsigned NOT NULL COMMENT '投注人次数',
    `addtime` int(10) unsigned NOT NULL COMMENT '下单时间',
    `amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '投注金额',
    `status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '订单状态,0待支付，1已支付', 
   
    `pay_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '支付时间',
    `pay_method` varchar(16)  NOT NULL DEFAULT '' COMMENT '支付方式',
    PRIMARY KEY (`order_id`),
    UNIQUE `order_sn` (`order_sn`),
    KEY `cj_id` (`cj_id`),
    KEY `uid` (`uid`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投注订单表';


CREATE TABLE `go_tou_zhu` (
    
  `tz_id` int(10)  unsigned NOT NULL AUTO_INCREMENT,
  `cj_id` int(10)  unsigned NOT NULL COMMENT '抽奖id，关联go_chou_jiang表',
  `order_id` int(10)  unsigned NOT NULL COMMENT '订单id，关联go_order表',
  `uid` int(10) unsigned NOT NULL COMMENT '用户id，关联go_user表',
  `yungouma_table` varchar(64) NOT NULL DEFAULT '' COMMENT '云购码表名,table_1',   
  `yungouma` varchar(256) NOT NULL DEFAULT '' COMMENT '获得的云购码(序列化)',   
  `touzhurenci` int(10) unsigned NOT NULL COMMENT '投注人次数',
  `is_zhong` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否中奖', 
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '投注金额',
  `addtime` decimal(10,3) unsigned NOT NULL COMMENT '投注时间,三位小数为毫秒数',
  
   PRIMARY KEY (`tz_id`),
   KEY `cj_id` (`cj_id`),
   KEY `order_id` (`order_id`),
   KEY `uid` (`uid`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投注表';


CREATE TABLE `go_yungouma_1` (

  `id` int(10)  unsigned NOT NULL AUTO_INCREMENT,
  `cj_id` int(10)  unsigned NOT NULL  COMMENT '抽奖id，关联go_chou_jiang表',
  `order_id` int(10)  unsigned NOT NULL DEFAULT '0' COMMENT '订单表id，关联go_order表',
  `tz_id` int(10)  unsigned NOT NULL DEFAULT '0' COMMENT '投注id，关联go_tou_zhu表',
  `uid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '用户id，关联go_user表',
  `yungouma` varchar(256) NOT NULL DEFAULT '' COMMENT '获得的云购码',

  PRIMARY KEY (`id`),
  KEY `cj_id` (`cj_id`),
  KEY `tz_id` (`tz_id`),
  KEY `order_id` (`order_id`),
  KEY `uid` (`uid`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='云购码表1,每个码一条记录(总需投注人数有多少个就有多少条)';


CREATE TABLE `go_zhongjia` (

   `zj_id` int(10)  unsigned NOT NULL AUTO_INCREMENT,
   `cj_id` int(10)  unsigned NOT NULL COMMENT '抽奖id，关联go_chou_jiang表',
   `order_id` int(10)  unsigned NOT NULL COMMENT '投注订单id,',
   `uid` int(10) unsigned NOT NULL COMMENT '中奖的用户id，关联go_user表',
   `zhongjiama`  varchar(256) NOT NULL DEFAULT '' COMMENT '中奖的云购码',
  
   PRIMARY KEY (`zj_id`),
   KEY `cj_id` (`cj_id`),
   KEY `order_id` (`order_id`),
   KEY `uid` (`uid`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='中奖表,关联go_tou_zhu投注表';




CREATE TABLE `go_pay_log` (
   
   `id` int(10)  unsigned NOT NULL AUTO_INCREMENT,
   `order_sn` varchar(64) NOT NULL COMMENT '订单唯一号',
   `pay_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '支付时间',
   `pay_method` varchar(16)  NOT NULL DEFAULT '' COMMENT '支付方式',
   `uid` int(10) unsigned NOT NULL COMMENT '用户id，关联go_user表',

    PRIMARY KEY (`id`),
    UNIQUE `order_sn` (`order_sn`),
   
    KEY `uid` (`uid`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='成功支付log';


CREATE TABLE `go_chongzhi_log` (

   `id` int(10)  unsigned NOT NULL AUTO_INCREMENT,
   `cj_id` int(10)  unsigned NOT NULL COMMENT '抽奖id，关联go_chou_jiang表',
   `order_sn` varchar(64) NOT NULL COMMENT '订单唯一号',
   `zj_id` int(10)  unsigned NOT NULL COMMENT '中奖id',
   `uid` int(10) unsigned NOT NULL COMMENT '用户id，关联go_user表',
   `chong_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '充值时间',
   `price` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '充值面额',
   `cost` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '充值成本',

   PRIMARY KEY (`id`),
   KEY `cj_id` (`cj_id`),
   UNIQUE `order_sn` (`order_sn`),
   KEY `zj_id` (`zj_id`),
   KEY `uid` (`uid`)

)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='充值log';




