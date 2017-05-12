CREATE DATABASE IF NOT EXISTS cardata;

USE cardata;

CREATE TABLE IF NOT EXISTS repairs (
  id varchar(10),
  dropoffdate varchar(20),
  pickupdate varchar(20),
  mechanic varchar(20),
  repairtype varchar(1),
  PRIMARY KEY (id)
)
