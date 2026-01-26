CREATE DATABASE olx_app;
USE olx_app;


 select * from listings;
 table users;
 desc users;
 
 TABLE messages;

-- CREATE TABLE users (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   first_name VARCHAR(100) NOT NULL,
--   last_name VARCHAR(100),
--   email VARCHAR(150) UNIQUE NOT NULL,
--   password VARCHAR(255) NOT NULL,
--   avatar TEXT,                          -- icon image url/path
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- use this one to create users table 
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  role ENUM('user','admin') DEFAULT 'user',
  PRIMARY KEY (id)
);


CREATE TABLE listings (
  id INT AUTO_INCREMENT PRIMARY KEY,

  title VARCHAR(255) NOT NULL,
  price INT NOT NULL,

  category VARCHAR(100) NOT NULL,        -- Cars, Bikes, Mobiles...
  subcategory VARCHAR(100) NOT NULL,     -- SUV, Bicycle, Men, etc.

  location TEXT NOT NULL,                -- "State, City, Landmark"
  year INT,                              -- year of purchase

  description TEXT,                     -- sub-category specific data

  seller_id INT NOT NULL,                -- user who posted

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE listing_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  image_path TEXT NOT NULL,              -- filename stored in /uploads
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);


CREATE TABLE favourites (
  id INT AUTO_INCREMENT PRIMARY KEY,

  user_id INT NOT NULL,
  listing_id INT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY unique_fav (user_id, listing_id),

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);


CREATE TABLE chats (
  id INT AUTO_INCREMENT PRIMARY KEY,

  listing_id INT NOT NULL,
  buyer_id INT NOT NULL,
  seller_id INT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
  FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,

  chat_id INT NOT NULL,
  sender_id INT NOT NULL,

  message TEXT NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);


-- optional
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- data ----------------------------
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE messages;
TRUNCATE TABLE chats;
TRUNCATE TABLE favourites;
TRUNCATE TABLE listing_images;
TRUNCATE TABLE listings;
TRUNCATE TABLE users;

ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE listings AUTO_INCREMENT = 1;
ALTER TABLE listing_images AUTO_INCREMENT = 1;
ALTER TABLE favourites AUTO_INCREMENT = 1;
ALTER TABLE chats AUTO_INCREMENT = 1;
ALTER TABLE messages AUTO_INCREMENT = 1;

SET FOREIGN_KEY_CHECKS = 1;



-- checks ---

/* ===== CLEAN START ===== */
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE messages;
TRUNCATE TABLE chats;
TRUNCATE TABLE favourites;
TRUNCATE TABLE listing_images;
TRUNCATE TABLE listings;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;


CREATE TABLE visits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  ip_address VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  event_date DATE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO visits (user_id, ip_address, created_at) VALUES


(1, '192.168.1.1',  '2026-01-20 09:10:00'),
(2, '192.168.1.2',  '2026-01-20 10:15:00'),
(3, '192.168.1.3',  '2026-01-20 11:20:00'),
(4, '192.168.1.4',  '2026-01-20 12:30:00'),
(5, '192.168.1.5',  '2026-01-20 14:40:00'),

(6, '192.168.1.6',  '2026-01-21 09:05:00'),
(7, '192.168.1.7',  '2026-01-21 10:10:00'),
(8, '192.168.1.8',  '2026-01-21 11:15:00'),
(9, '192.168.1.9',  '2026-01-21 13:20:00'),
(10,'192.168.1.10', '2026-01-21 15:25:00'),

(11,'192.168.1.11', '2026-01-22 09:00:00'),
(12,'192.168.1.12', '2026-01-22 10:30:00'),
(13,'192.168.1.13', '2026-01-22 12:00:00'),
(14,'192.168.1.14', '2026-01-22 14:10:00'),
(15,'192.168.1.15', '2026-01-22 16:20:00'),

(16,'192.168.1.16', '2026-01-23 09:40:00'),
(17,'192.168.1.17', '2026-01-23 11:00:00'),
(18,'192.168.1.18', '2026-01-23 13:30:00'),
(19,'192.168.1.19', '2026-01-23 15:50:00'),
(20,'192.168.1.20', '2026-01-23 17:10:00'),

(21,'192.168.1.21', '2026-01-24 10:00:00'),
(22,'192.168.1.22', '2026-01-24 12:30:00'),
(23,'192.168.1.23', '2026-01-24 14:45:00'),
(24,'192.168.1.24', '2026-01-24 16:10:00'),
(25,'192.168.1.25', '2026-01-24 18:00:00');


INSERT INTO admin_events (title, event_date, description) VALUES
('System Maintenance', '2026-01-20', 'Routine server maintenance'),
('Admin Meeting', '2026-01-21', 'Weekly admin discussion'),
('User Review', '2026-01-22', 'Review new user accounts'),
('Sales Planning', '2026-01-23', 'Planning sales strategy'),
('Database Backup', '2026-01-24', 'Full database backup'),

('Feature Deployment', '2026-01-25', 'Deploy new features'),
('Bug Review', '2026-01-26', 'Check reported bugs'),
('Marketing Meeting', '2026-01-27', 'Marketing planning session'),
('Security Audit', '2026-01-28', 'Audit system security'),
('Performance Check', '2026-01-29', 'Analyze system performance'),

('Product Discussion', '2026-01-30', 'Discuss product roadmap'),
('Client Call', '2026-01-31', 'Meeting with major client'),
('UI Review', '2026-02-01', 'Review admin dashboard UI'),
('Analytics Review', '2026-02-02', 'Check analytics reports'),
('Team Training', '2026-02-03', 'Training for new team members'),

('Server Upgrade', '2026-02-04', 'Upgrade production server'),
('Policy Update', '2026-02-05', 'Update internal policies'),
('Release Planning', '2026-02-06', 'Plan next software release'),
('Data Cleanup', '2026-02-07', 'Clean old unused data'),
('Monthly Review', '2026-02-08', 'Monthly performance review');





/* ===== USERS (20) ===== */
INSERT INTO users (first_name,last_name,email,password,avatar) VALUES
('Rohit','Patil','rohit@gmail.com','pass123','/avatars/u1.png'),
('Amit','Sharma','amit@gmail.com','pass123','/avatars/u2.png'),
('Neha','Verma','neha@gmail.com','pass123','/avatars/u3.png'),
('Priya','Singh','priya@gmail.com','pass123','/avatars/u4.png'),
('Rahul','Mehta','rahul@gmail.com','pass123','/avatars/u5.png'),
('Karan','Joshi','karan@gmail.com','pass123','/avatars/u6.png'),
('Ankit','Gupta','ankit@gmail.com','pass123','/avatars/u7.png'),
('Pooja','Nair','pooja@gmail.com','pass123','/avatars/u8.png'),
('Vikas','Kale','vikas@gmail.com','pass123','/avatars/u9.png'),
('Sneha','More','sneha@gmail.com','pass123','/avatars/u10.png'),
('Arjun','Rao','arjun@gmail.com','pass123','/avatars/u11.png'),
('Riya','Kapoor','riya@gmail.com','pass123','/avatars/u12.png'),
('Sanjay','Yadav','sanjay@gmail.com','pass123','/avatars/u13.png'),
('Manish','Mali','manish@gmail.com','pass123','/avatars/u14.png'),
('Aarti','Deshmukh','aarti@gmail.com','pass123','/avatars/u15.png'),
('Nikhil','Bansal','nikhil@gmail.com','pass123','/avatars/u16.png'),
('Isha','Khan','isha@gmail.com','pass123','/avatars/u17.png'),
('Deepak','Kulkarni','deepak@gmail.com','pass123','/avatars/u18.png'),
('Sonali','Pawar','sonali@gmail.com','pass123','/avatars/u19.png'),
('Harsh','Jain','harsh@gmail.com','pass123','/avatars/u20.png');


/* ===== LISTINGS (seller_id = 1..20) ===== */
INSERT INTO listings (title,price,category,subcategory,location,year,description,seller_id) VALUES
('iPhone 12',45000,'Electronics','Mobile','Mumbai',2021,'Good condition iPhone',1),
('Dell Laptop',38000,'Electronics','Laptop','Pune',2020,'Office laptop',2),
('Honda Activa',55000,'Vehicles','Scooter','Nashik',2019,'Well maintained',3),
('Samsung TV 43"',28000,'Electronics','TV','Delhi',2022,'Smart TV',4),
('Wooden Sofa',12000,'Furniture','Sofa','Nagpur',2018,'3 seater sofa',5),
('Canon DSLR',30000,'Electronics','Camera','Bangalore',2021,'With lens kit',6),
('Study Table',4000,'Furniture','Table','Kolhapur',2020,'Good wood',7),
('Mountain Bike',15000,'Sports','Cycle','Pune',2019,'Almost new',8),
('Refrigerator',18000,'Appliances','Fridge','Mumbai',2020,'Single door',9),
('Washing Machine',16000,'Appliances','Washer','Thane',2021,'Fully automatic',10),
('Gaming PC',70000,'Electronics','Computer','Hyderabad',2023,'RTX graphics',11),
('Office Chair',3500,'Furniture','Chair','Indore',2022,'Ergonomic',12),
('Royal Enfield',110000,'Vehicles','Bike','Jaipur',2018,'Classic 350',13),
('Air Conditioner',25000,'Appliances','AC','Surat',2021,'1.5 ton split',14),
('Microwave Oven',7000,'Appliances','Oven','Vadodara',2020,'Convection',15),
('iPad Air',42000,'Electronics','Tablet','Chennai',2022,'WiFi model',16),
('Books Set',2000,'Books','Educational','Bhopal',2017,'Engineering books',17),
('Guitar',6000,'Music','Instrument','Goa',2021,'Acoustic guitar',18),
('Smart Watch',8000,'Electronics','Watch','Noida',2023,'Fitness watch',19),
('Office Desk',5000,'Furniture','Desk','Ahmedabad',2020,'Wooden desk',20);


/* ===== LISTING IMAGES ===== */
INSERT INTO listing_images (listing_id,image_path) VALUES
(1,'/images/iphone1.jpg'),(1,'/images/iphone2.jpg'),
(2,'/images/laptop1.jpg'),(2,'/images/laptop2.jpg'),
(3,'/images/activa1.jpg'),(3,'/images/activa2.jpg'),
(4,'/images/tv1.jpg'),(4,'/images/tv2.jpg'),
(5,'/images/sofa1.jpg'),(5,'/images/sofa2.jpg'),
(6,'/images/camera1.jpg'),(6,'/images/camera2.jpg'),
(7,'/images/table1.jpg'),(7,'/images/table2.jpg'),
(8,'/images/bike1.jpg'),(8,'/images/bike2.jpg'),
(9,'/images/fridge1.jpg'),(9,'/images/fridge2.jpg'),
(10,'/images/wash1.jpg'),(10,'/images/wash2.jpg'),
(11,'/images/pc1.jpg'),(11,'/images/pc2.jpg'),
(12,'/images/chair1.jpg'),(12,'/images/chair2.jpg'),
(13,'/images/re1.jpg'),(13,'/images/re2.jpg'),
(14,'/images/ac1.jpg'),(14,'/images/ac2.jpg'),
(15,'/images/oven1.jpg'),(15,'/images/oven2.jpg'),
(16,'/images/ipad1.jpg'),(16,'/images/ipad2.jpg'),
(17,'/images/books1.jpg'),(17,'/images/books2.jpg'),
(18,'/images/guitar1.jpg'),(18,'/images/guitar2.jpg'),
(19,'/images/watch1.jpg'),(19,'/images/watch2.jpg'),
(20,'/images/desk1.jpg'),(20,'/images/desk2.jpg');


/* ===== FAVOURITES ===== */
INSERT INTO favourites (user_id,listing_id) VALUES
(2,1),(3,1),(4,2),(5,3),(6,4),
(7,5),(8,6),(9,7),(10,8),(11,9),
(12,10),(13,11),(14,12),(15,13),(16,14),
(17,15),(18,16),(19,17),(20,18),(1,19);


/* ===== CHATS ===== */
INSERT INTO chats (listing_id,buyer_id,seller_id) VALUES
(1,2,1),(2,3,2),(3,4,3),(4,5,4),(5,6,5),
(6,7,6),(7,8,7),(8,9,8),(9,10,9),(10,11,10),
(11,12,11),(12,13,12),(13,14,13),(14,15,14),(15,16,15),
(16,17,16),(17,18,17),(18,19,18),(19,20,19),(20,1,20);


/* ===== MESSAGES ===== */
INSERT INTO messages (chat_id,sender_id,message) VALUES
(1,2,'Is this still available?'),(1,1,'Yes, available'),
(2,3,'What is final price?'),(2,2,'Slightly negotiable'),
(3,4,'Any scratches?'),(3,3,'Minor ones'),
(4,5,'Warranty left?'),(4,4,'Yes 6 months'),
(5,6,'Can you deliver?'),(5,5,'Pickup only'),
(6,7,'Lens included?'),(6,6,'Yes included'),
(7,8,'Is it solid wood?'),(7,7,'Yes teak wood'),
(8,9,'Gear working fine?'),(8,8,'Perfect condition'),
(9,10,'Power consumption?'),(9,9,'Very low'),
(10,11,'Installation free?'),(10,10,'Yes free'),
(11,12,'Graphics card model?'),(11,11,'RTX 3060'),
(12,13,'Any damage?'),(12,12,'No damage'),
(13,14,'Mileage?'),(13,13,'35 kmpl'),
(14,15,'Inverter supported?'),(14,14,'Yes supported'),
(15,16,'Bill available?'),(15,15,'Yes original bill'),
(16,17,'Any dents?'),(16,16,'No dents'),
(17,18,'Pages complete?'),(17,17,'Yes full set'),
(18,19,'Brand new strings?'),(18,18,'Yes changed'),
(19,20,'Battery backup?'),(19,19,'2 days'),
(20,1,'Is table heavy?'),(20,20,'Medium weight');


table users;

table favourites;
