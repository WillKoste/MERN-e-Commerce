create table products (
	id serial primary key,
	name text not null,
	image text,
	description text,
	brand text,
	category varchar(100),
	price float not null,
	countInStock int not null,
	rating float,
	numReviews int,
	created_at date default now(),
	timestamp time default current_time
)


insert into products
(name, image, description, brand, category, price, countinstock, rating, numreviews, user_id)
values ('Really Big Boat', '/images/boat.jpg', 'This boat is so pretty!! Like 4realz. Buy the boat - you will be happy!!!', 'BoatLand', 'Boats', 15642.99, 2, 3.8, 7, 4)




alter table products alter column image set default '/images/placeholder.png';



alter table products alter column user_id set not null;



alter table products add column user_id int references users(id)




alter table paymentresults 
	add column created_at date
	default now();


alter table paymentresults 
	add column timestamp time
	default current_time;


update products set user_id = '3' where id > 10;



select * from products p;

select * from products p where brand like '%Apple%'

delete from products where id = 12;




create table users (
	id serial primary key,
	name text not null,
	email text not null unique,
	password text not null,
	isAdmin bool default false not null,
	created_at data default now(),
	timestamp time default current_time
);



alter table users
	add column created_at date
	default now();


alter table users 
	add column timestamp time
	default current_time;


insert into users (name, email, password) values ('Kitty Koste', 'kittykoste@gmail.com', '123456')


update users set title = 'Doobies Post' where creatorid = 5;


select  p.id product_id, u.id user_id, p.user_id product_user_id, p."name", p.price from users u inner join products p on p.user_id = u.id where p.user_id = 4;


select * from USERS;



alter table shippingaddresses add column id serial primary key;




create table reviews (
	id serial primary key,
	name text not null,
	rating float not null,
	comment text,
	author_id int references users(id),
	product_id int references products(id),
	created_at date default now(),
	timestamp time default current_time
);




create table paymentresults (
	id serial primary key,
	payment_id text,
	status text,
	update_time text,
	email_address text
);






create table orders (
	id serial primary key,
	user_id int references users(id),
	order_item_id int references orderitems(id),
	shipping_address_id int references shippingaddresses(id),
	payment_method text not null,
	payment_result int references paymentresults(id),
	tax_price float not null default 0.0,
	shipping_price float not null default 0.0,
	total_price float not null default 0.0,
	is_paid bool not null default false,
	paid_date date,
	is_delivered bool not null default false,
	delivered_date date,
	created_at date default now(),
	timestamp time default current_time
);



create table shippingaddresses (
	address text not null,
	city text not null,
	postal_code text not null,
	country text not null
);




create table orderitems (
	id serial primary key,
	name text not null,
	qty int not null,
	image text not null,
	price float not null,
	product_id int references products(id)
);








-- USERS --

INSERT INTO "users" (name,email,password,isadmin,id) VALUES ('Hanae Wells','Cras.dolor@ut.ca','faucibus','True',1),('Hillary Casey','rutrum@nisi.ca','senectus','False',2),('Wyatt Carlson','consectetuer.cursus@Donec.net','felis.','True',3),('Brendan Simpson','Proin.vel@nonenim.com','fames','False',4),('Dahlia Dotson','Donec@auctorveliteget.com','et','True',5),('Ashton Campos','rutrum.magna@elit.com','orci','False',6),('Edward Harrington','vitae@ipsumdolorsit.ca','cursus.','True',7),('Nyssa Bennett','Sed.nec@luctusvulputate.ca','nibh.','True',8),('Rebekah Allen','eu.sem@purusaccumsaninterdum.co.uk','odio.','True',9),('Lester Molina','egestas.rhoncus.Proin@est.com','id','False',10);
INSERT INTO "users" (name,email,password,isadmin,id) VALUES ('Shellie Roberson','egestas@purusaccumsaninterdum.com','Mauris','True',11),('Alvin Atkins','ac.mattis.velit@non.org','aliquet','True',12),('Ina Pierce','adipiscing@commodo.edu','euismod','False',13),('Dustin Sweeney','nulla.Integer@natoquepenatibus.co.uk','dolor','True',14),('Addison Huber','et.ipsum.cursus@sitametmetus.co.uk','pede.','True',15),('Karen Nieves','Aliquam.nec.enim@pedeblanditcongue.net','quam','False',16),('Acton Houston','convallis.dolor.Quisque@risusNulla.co.uk','Nam','True',17),('Francis Gonzales','quis.arcu.vel@mi.net','elementum,','False',18),('Lionel Sykes','arcu.Vestibulum.ante@magnaPhasellus.co.uk','purus','False',19),('Aaron Dejesus','Cras.vehicula.aliquet@estvitae.ca','mi','False',20);
INSERT INTO "users" (name,email,password,isadmin,id) VALUES ('Alexander Beasley','lobortis.quis@sed.net','ipsum','False',21),('Kaye Christian','sem@liberoat.net','mattis','True',22),('Roanna Patterson','tortor.nibh@tempor.org','Sed','False',23),('Walker Jacobson','a.neque.Nullam@tristique.com','risus.','False',24),('Melvin Stuart','Fusce.mi.lorem@Vivamussitamet.org','diam','True',25),('Elmo Waters','at.fringilla@Mauris.net','montes,','True',26),('Ross Davenport','enim@semPellentesqueut.ca','aliquam','False',27),('Daryl Spears','Donec@antebibendum.ca','eget,','True',28),('Remedios Small','mollis@purusactellus.co.uk','adipiscing','True',29),('Libby Brock','molestie.orci.tincidunt@nonenimcommodo.org','sit','False',30);
INSERT INTO "users" (name,email,password,isadmin,id) VALUES ('Gisela Mason','non.nisi.Aenean@iaculis.net','molestie','False',31),('Maite Hyde','Fusce.dolor.quam@tinciduntdui.co.uk','tristique','True',32),('Christopher Banks','tellus@CuraeDonec.co.uk','non,','False',33),('Lev Mullins','vestibulum@cursus.ca','tincidunt','False',34),('MacKenzie Dillon','sem.consequat.nec@Maurismolestie.ca','auctor','False',35),('Abigail Mcclure','urna.convallis@ipsumSuspendisse.ca','nascetur','True',36),('Yuri Hyde','est@etlaciniavitae.edu','Ut','False',37),('Raymond Benson','est.mollis.non@Phasellusdapibus.co.uk','a,','False',38),('Dalton Wolfe','erat@vel.com','Mauris','False',39),('Illiana Stuart','sodales.nisi.magna@sedconsequat.org','nonummy','True',40);
INSERT INTO "users" (name,email,password,isadmin,id) VALUES ('Roth Mcgowan','ultrices@facilisismagnatellus.com','diam.','False',41),('Martina Daniels','eget.nisi.dictum@nasceturridiculus.org','nunc.','True',42),('Deacon Sears','purus.ac.tellus@tempor.org','fames','True',43),('Lance Puckett','Aenean@quislectusNullam.com','sed','True',44),('Cairo Weber','ipsum.Suspendisse.sagittis@ultricies.co.uk','Proin','True',45),('Laurel Kelly','elit.Etiam.laoreet@imperdietnecleo.com','cursus,','True',46),('Nolan Robinson','sociosqu@neque.edu','nunc','False',47),('Mercedes Wiggins','Aliquam.erat@Vivamussitamet.net','elementum,','True',48),('Nash Graham','egestas@utpellentesqueeget.ca','cursus','True',49),('Donovan Bentley','Pellentesque.tincidunt.tempus@tristiquepharetra.net','mus.','False',50);
INSERT INTO "users" (name,email,password,isadmin,id) VALUES ('Hayley Mccall','diam.nunc.ullamcorper@Suspendissetristique.edu','dignissim','True',51),('Evan Meadows','elit.sed@Phaselluselitpede.net','ante.','True',52),('Mercedes Simmons','dictum@ante.org','non,','True',53),('Miriam Cooke','sodales.at@maurisipsum.ca','mauris','False',54),('Ezra Turner','quis.pede.Suspendisse@dolortempus.com','commodo','True',55),('Quemby Figueroa','et.malesuada.fames@aliquamarcuAliquam.ca','Aliquam','False',56),('Tarik Hebert','a.neque@sedliberoProin.ca','interdum.','True',57),('Jaden Mcgee','placerat@enimconsequatpurus.org','Fusce','True',58),('Leo Daniel','tempus@nisi.org','vitae','True',59),('Neil Rutledge','id.blandit.at@Praesentinterdumligula.net','est.','True',60);
INSERT INTO "users" (name,email,password,isadmin,id) VALUES ('Geraldine Church','semper@nequeNullam.com','nec,','True',61),('Stone Henson','Nam@eutemporerat.com','et','False',62),('Florence Peck','malesuada.ut@ProinmiAliquam.org','Nam','True',63),('Randall Mcclain','non.magna@necluctus.com','urna','False',64),('Jerome Bowman','et.euismod.et@urnaNullam.ca','vulputate,','False',65),('Darryl Atkins','luctus.aliquet.odio@penatibus.ca','accumsan','True',66),('Eve Baker','ligula.elit.pretium@sollicitudina.net','eget','False',67),('Raymond Maynard','ut.eros.non@imperdietnecleo.net','libero.','True',68),('Reed Francis','Etiam.laoreet@arcuacorci.org','In','False',69),('Rhea Weaver','eu@atarcuVestibulum.net','ac','False',70);
INSERT INTO "users" (name,email,password,isadmin,id) VALUES ('Grant Johns','Suspendisse.aliquet.sem@pede.edu','facilisis.','False',71),('Samuel Whitehead','eu@ultriciessem.com','Cum','False',72),('Brian Houston','amet@netus.com','ligula','True',73),('Riley Holder','pretium.aliquet.metus@antebibendum.edu','conubia','False',74),('Anjolie Sims','id.blandit.at@egestas.ca','consectetuer','True',75),('Tanner Mcmahon','Nullam@musProin.net','Duis','False',76),('Ethan Henson','ipsum.Curabitur.consequat@apurusDuis.net','iaculis','True',77),('Maya Russo','et.malesuada.fames@eleifendnondapibus.co.uk','vitae','True',78),('Hillary Wilkerson','Aenean.sed.pede@metusfacilisis.ca','a','False',79),('Xandra Mckenzie','mollis@vel.com','vulputate,','False',80);
INSERT INTO "users" (name,email,password,isadmin,id) VALUES ('Jennifer Berger','In@risusIn.ca','sollicitudin','True',81),('Aimee Farmer','neque.sed.sem@neque.ca','sollicitudin','True',82),('Alexander Rocha','Vivamus.nibh@nullaIntincidunt.com','Sed','True',83),('Elizabeth Snyder','non.enim@mollislectuspede.org','lobortis','False',84),('Deacon Moon','mauris.rhoncus.id@Nullatinciduntneque.edu','magna.','False',85),('Maxine Salas','nunc.risus@tempor.co.uk','magnis','False',86),('Ishmael Merrill','at.velit@feugiatmetussit.co.uk','gravida.','False',87),('Kato Brooks','nisl.arcu.iaculis@utcursus.ca','sapien,','True',88),('Bruce Day','sed.dictum@sitamet.edu','lectus','False',89),('Oscar Barrera','dictum@sollicitudincommodoipsum.edu','lorem','True',90);
INSERT INTO "users" (name,email,password,isadmin,id) VALUES ('William Harrison','felis.eget@ligulaDonecluctus.com','magna.','True',91),('Zane Aguilar','nec.enim@Maurismolestiepharetra.org','Suspendisse','False',92),('Ruby Hensley','accumsan@Donecvitae.org','iaculis','False',93),('Aurora Hayes','magna@nuncrisus.com','tempus','True',94),('Althea Mays','facilisis@semut.net','massa.','False',95),('Iris Garza','eu.tempor.erat@mollisDuis.edu','Fusce','True',96),('Courtney Hancock','aliquet.lobortis@Donecporttitor.ca','eleifend','True',97),('Vincent Walls','auctor@Quisquevarius.net','vel','True',98),('Leilani Workman','Integer@infelisNulla.co.uk','lorem','False',99),('Fletcher Oconnor','sit@duinec.edu','at,','False',100);




-- Products --
INSERT INTO products (name,image,description,brand,category,price,countinstock,rating,numreviews,user_id,id) VALUES ('Zelenia Salinas','Proin dolor. Nulla','mi pede, nonummy','non, lacinia','odio',165,41,2,31,21,1),('Myra Guy','enim. Suspendisse aliquet,','cursus. Nunc mauris elit, dictum eu, eleifend nec, malesuada','dolor','Curabitur',20,8,3,38,33,2),('Oliver Foster','mauris eu elit.','ligula consectetuer rhoncus. Nullam velit dui, semper','nec','viverra.',180,23,3,18,94,3),('Gary Neal','sed pede nec','Nullam','in','Nulla',185,19,1,40,2,4),('Ferris Michael','quis lectus. Nullam','tellus. Aenean egestas hendrerit neque. In ornare sagittis felis.','malesuada augue','erat.',274,47,1,11,98,5),('Salvador Burton','tristique senectus et','mauris blandit mattis. Cras eget nisi','ac arcu.','non,',31,10,5,2,81,6),('Yolanda Stephenson','tortor at risus.','porttitor eros nec tellus. Nunc lectus pede, ultrices','Sed diam','eget,',196,41,5,8,11,7),('Whitney Hawkins','blandit at, nisi.','consequat purus.','nec,','vitae',157,16,2,28,16,8),('Jeremy Hogan','sed, est. Nunc','Phasellus nulla. Integer vulputate, risus a ultricies adipiscing,','odio vel','senectus',86,17,3,7,19,9),('Wallace Fuentes','Donec nibh. Quisque','Morbi vehicula.','sapien','turpis',163,23,5,30,64,10);
INSERT INTO products (name,image,description,brand,category,price,countinstock,rating,numreviews,user_id,id) VALUES ('Constance Trujillo','mauris id sapien.','parturient montes,','mus.','Proin',181,17,5,23,41,11),('Dacey Lynn','interdum libero dui','Nullam feugiat placerat velit. Quisque varius. Nam','lacinia orci,','aliquet',88,46,1,25,78,12),('Vernon Holmes','volutpat. Nulla facilisis.','non magna. Nam ligula elit,','a','tincidunt',90,41,5,12,83,13),('Ryder Salas','aliquet magna a','id, erat. Etiam vestibulum massa rutrum','vitae semper','neque.',94,35,4,30,36,14),('Fulton Collins','feugiat nec, diam.','inceptos hymenaeos.','est','facilisis',34,37,1,24,35,15),('Levi Whitney','auctor vitae, aliquet','malesuada. Integer id','tempor','adipiscing',164,40,1,24,77,16),('Tashya Ray','non, egestas a,','in, tempus eu, ligula. Aenean euismod','consectetuer, cursus','per',229,31,1,31,23,17),('Yolanda Mcintyre','quam, elementum at,','accumsan laoreet ipsum. Curabitur consequat, lectus sit amet luctus','velit.','dapibus',190,43,5,13,17,18),('Isaiah Joyner','lacus vestibulum lorem,','Donec vitae erat vel pede blandit congue. In scelerisque','augue ac','eget',85,23,5,15,39,19),('Jerome Case','tellus. Phasellus elit','eu elit. Nulla facilisi. Sed neque. Sed eget','tincidunt aliquam','mi',200,10,2,6,36,20);
INSERT INTO products (name,image,description,brand,category,price,countinstock,rating,numreviews,user_id,id) VALUES ('Kyle Pace','arcu imperdiet ullamcorper.','non arcu. Vivamus sit amet','posuere,','eget',1,33,2,39,30,21),('Caldwell Cash','diam nunc, ullamcorper','pharetra sed, hendrerit a, arcu.','lorem ut','Integer',244,44,5,19,81,22),('Kim Strong','massa lobortis ultrices.','urna suscipit','velit dui,','Sed',68,7,2,15,90,23),('Herrod Vinson','nec metus facilisis','Cras dolor dolor,','ut aliquam','parturient',95,25,3,27,68,24),('Ivy Herman','nascetur ridiculus mus.','Proin non massa non ante','et,','Fusce',187,41,2,23,92,25),('Adrian Wilkinson','Sed auctor odio','diam at','a, magna.','non,',48,11,3,31,65,26),('Stone Gonzales','congue. In scelerisque','arcu. Nunc','Aliquam','a',259,31,4,10,58,27),('Yardley Robles','sed dolor. Fusce','justo nec ante. Maecenas mi','massa lobortis','non',95,7,4,17,59,28),('Mercedes Pickett','fermentum arcu. Vestibulum','consectetuer adipiscing elit. Etiam laoreet, libero','consequat nec,','a,',83,39,2,28,100,29),('Aimee Hill','vel arcu eu','velit. Sed malesuada augue ut lacus. Nulla','ac turpis','est',236,14,4,20,77,30);
INSERT INTO products (name,image,description,brand,category,price,countinstock,rating,numreviews,user_id,id) VALUES ('Geraldine Stewart','vel arcu eu','Quisque libero lacus, varius et,','Etiam','dolor',37,26,4,28,58,31),('Michael Dominguez','quam vel sapien','risus. Nunc ac sem ut dolor dapibus gravida. Aliquam tincidunt,','risus','tempor',110,29,5,11,94,32),('Barrett Chambers','Duis ac arcu.','blandit. Nam nulla magna, malesuada','risus,','eros.',280,19,5,22,45,33),('Jared Crawford','eu elit. Nulla','sem ut','eleifend.','lectus.',88,35,2,36,3,34),('Margaret Barron','lorem semper auctor.','est','pede,','urna',266,42,2,37,94,35),('Russell Horne','libero nec ligula','eget magna. Suspendisse tristique neque venenatis lacus. Etiam','feugiat non,','ipsum.',15,43,3,13,46,36),('Rahim Weeks','cursus luctus, ipsum','aliquet libero. Integer in magna. Phasellus dolor elit, pellentesque a,','dictum','dolor',193,18,3,17,34,37),('Eleanor Sloan','massa non ante','dapibus quam quis diam. Pellentesque','eros turpis','Curae;',244,50,1,20,38,38),('Nelle Hickman','a, magna. Lorem','In at pede. Cras vulputate velit eu sem. Pellentesque','egestas','vitae',229,46,5,4,44,39),('Adena Gates','Cras dictum ultricies','consequat purus.','et,','non',208,24,4,36,36,40);
INSERT INTO products (name,image,description,brand,category,price,countinstock,rating,numreviews,user_id,id) VALUES ('Chandler George','non enim. Mauris','Duis dignissim tempor','egestas, urna','Nam',71,3,5,9,89,41),('Ursula Hobbs','lacinia orci, consectetuer','ac','amet, faucibus','felis',182,46,1,12,34,42),('Hiram Park','sit amet orci.','turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque','et','justo',71,5,3,36,88,43),('Dalton Olsen','facilisi. Sed neque.','sagittis lobortis mauris. Suspendisse aliquet molestie tellus.','in aliquet','sit',32,25,2,10,26,44),('Russell Ochoa','nulla. Cras eu','mi lorem, vehicula et, rutrum eu, ultrices','nunc ac','Sed',103,36,3,32,8,45),('Joel Gould','scelerisque, lorem ipsum','vitae, sodales at, velit. Pellentesque ultricies dignissim','orci.','lorem,',44,35,5,28,94,46),('Ariana Melendez','ridiculus mus. Proin','commodo at, libero. Morbi accumsan laoreet ipsum. Curabitur','Cras eu','pretium',278,8,3,37,15,47),('Sigourney Maynard','posuere vulputate, lacus.','netus et malesuada fames ac','mus.','est',79,28,1,7,51,48),('Damon Tyler','faucibus ut, nulla.','ac mattis semper, dui lectus rutrum urna, nec luctus','vitae, erat.','velit',155,14,2,1,15,49),('Chiquita Mcmahon','non massa non','blandit congue. In scelerisque scelerisque dui. Suspendisse ac','natoque penatibus','arcu.',298,5,2,38,30,50);
INSERT INTO products (name,image,description,brand,category,price,countinstock,rating,numreviews,user_id,id) VALUES ('Scarlet Spencer','iaculis aliquet diam.','Pellentesque','molestie tortor','ante.',91,21,1,3,60,51),('Hector Key','ut quam vel','dictum eleifend, nunc risus varius orci, in consequat enim','varius orci,','dictum.',192,12,1,4,37,52),('Adara Nunez','sagittis felis. Donec','risus. Donec egestas.','Pellentesque','adipiscing',149,44,4,10,63,53),('Ross Zamora','imperdiet ullamcorper. Duis','pede et risus. Quisque libero lacus, varius et, euismod et,','molestie in,','non',224,9,2,18,62,54),('Daria Joyce','ipsum sodales purus,','mauris. Integer','Curae; Phasellus','vitae,',151,14,5,34,61,55),('Kristen Frazier','vehicula et, rutrum','pede. Cras vulputate velit eu sem. Pellentesque ut','facilisis','mollis',41,35,2,37,2,56),('Martina Brady','Etiam laoreet, libero','eu arcu. Morbi sit amet massa. Quisque porttitor eros nec','semper rutrum.','eu,',179,27,4,26,5,57),('Cruz Everett','Suspendisse commodo tincidunt','natoque penatibus et magnis dis parturient montes,','dis','accumsan',147,21,4,25,76,58),('Noah Montoya','justo sit amet','eleifend vitae, erat. Vivamus nisi.','Proin non','tristique',32,46,3,13,51,59),('Keegan Love','Nunc ac sem','interdum ligula eu enim. Etiam imperdiet dictum','tristique','lacinia.',219,25,2,19,75,60);
INSERT INTO products (name,image,description,brand,category,price,countinstock,rating,numreviews,user_id,id) VALUES ('Bert Clarke','leo, in lobortis','lectus. Cum sociis natoque penatibus et magnis','malesuada','Fusce',295,48,1,3,30,61),('Arsenio Whitaker','Cum sociis natoque','lobortis quis, pede. Suspendisse dui. Fusce diam','arcu. Sed','tincidunt',218,10,5,13,32,62),('Amir Freeman','gravida mauris ut','consectetuer adipiscing elit. Aliquam auctor, velit eget laoreet posuere,','sit','amet,',99,22,3,9,67,63),('Keiko Miles','leo. Morbi neque','ac','ullamcorper','hymenaeos.',39,8,3,25,99,64),('Solomon Riggs','Fusce dolor quam,','Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque','aliquet vel,','at',29,31,4,22,51,65),('Guy Estrada','accumsan neque et','ut cursus luctus, ipsum leo elementum sem,','elit,','posuere',102,41,5,11,26,66),('Rogan Barrera','laoreet lectus quis','sodales. Mauris blandit enim consequat','mus. Proin','rutrum',162,30,4,20,11,67),('Keefe Pugh','nec urna suscipit','Curae; Donec tincidunt. Donec vitae erat vel pede blandit congue.','vitae','a,',255,3,3,25,1,68),('Brandon Massey','sit amet, consectetuer','massa. Mauris vestibulum,','tellus, imperdiet','et,',194,24,3,32,17,69),('Nehru Pace','ut lacus. Nulla','Nunc','augue','magna.',14,8,2,30,80,70);
INSERT INTO products (name,image,description,brand,category,price,countinstock,rating,numreviews,user_id,id) VALUES ('Robert England','est tempor bibendum.','eu, ultrices','Mauris molestie','vulputate',197,2,3,1,5,71),('Quyn Stein','mi fringilla mi','sem semper erat, in consectetuer ipsum nunc id enim. Curabitur','ipsum','montes,',246,42,5,32,58,72),('Carlos Preston','egestas. Fusce aliquet','Cum sociis natoque penatibus et magnis dis parturient montes, nascetur','purus.','imperdiet',14,49,4,35,68,73),('Tobias Dillon','purus gravida sagittis.','nisi. Cum sociis natoque penatibus et magnis dis parturient montes,','natoque','ac',114,36,1,39,57,74),('Ciara Carrillo','metus facilisis lorem','enim commodo hendrerit. Donec porttitor tellus','pulvinar','Nunc',274,44,1,31,95,75),('Vivian Gallagher','et pede. Nunc','sit amet massa. Quisque','Morbi accumsan','et,',135,24,1,26,94,76),('Hall Giles','Etiam imperdiet dictum','nec, malesuada','dui. Suspendisse','gravida',240,26,2,18,84,77),('Anthony Fuentes','varius orci, in','amet ornare lectus justo eu arcu. Morbi sit amet','consectetuer ipsum','vitae',122,4,4,18,47,78),('Nolan Singleton','lectus. Nullam suscipit,','facilisis vitae, orci. Phasellus','mi, ac','nisi',137,29,5,37,3,79),('Amity Howard','ante. Vivamus non','Integer urna. Vivamus','dolor,','Proin',31,36,2,26,37,80);
INSERT INTO products (name,image,description,brand,category,price,countinstock,rating,numreviews,user_id,id) VALUES ('Buckminster Mcpherson','augue id ante','iaculis enim, sit amet','Nulla','enim',7,14,3,15,86,81),('Fiona Hebert','lorem tristique aliquet.','vel,','mauris,','per',15,44,2,37,77,82),('Brittany Kent','fringilla purus mauris','est, congue a, aliquet vel,','euismod urna.','hendrerit',103,26,1,26,30,83),('Bradley Torres','Donec tempor, est','et pede. Nunc sed orci','amet','vel',34,32,1,14,100,84),('Cameron Vaughan','in, hendrerit consectetuer,','urna, nec luctus felis purus ac tellus. Suspendisse sed dolor.','Duis','Phasellus',31,36,5,35,5,85),('Moana Fields','mollis. Integer tincidunt','tortor nibh sit amet orci. Ut','Sed','tincidunt.',31,17,1,38,38,86),('Katell Sellers','molestie tellus. Aenean','risus, at fringilla purus','in, dolor.','Vivamus',288,49,1,16,31,87),('Cora Vega','gravida sit amet,','Aliquam ornare, libero at auctor ullamcorper,','lectus quis','tortor',184,26,4,36,31,88),('Hilary Davis','Nullam nisl. Maecenas','tempor bibendum. Donec felis orci,','aliquet, sem','massa',170,23,1,16,99,89),('Norman Merrill','natoque penatibus et','sagittis. Duis gravida. Praesent eu nulla at','Sed','neque',97,49,2,18,95,90);
INSERT INTO products (name,image,description,brand,category,price,countinstock,rating,numreviews,user_id,id) VALUES ('Bruno Booth','eu erat semper','odio sagittis semper. Nam','auctor quis,','felis.',221,17,4,21,12,91),('Aristotle Oneil','Nullam scelerisque neque','facilisis lorem tristique aliquet. Phasellus fermentum','arcu.','purus,',217,50,2,16,28,92),('Timothy Haney','pharetra sed, hendrerit','Sed nulla ante,','tellus lorem','nibh.',66,36,1,6,82,93),('Orli Chandler','Aliquam tincidunt, nunc','Quisque varius. Nam porttitor scelerisque neque. Nullam','eros. Proin','neque',90,39,1,19,92,94),('Amelia Wagner','viverra. Donec tempus,','tempus mauris erat eget ipsum. Suspendisse sagittis.','sit','libero',242,23,3,23,82,95),('Robert Johnston','Maecenas ornare egestas','consequat dolor vitae dolor. Donec fringilla. Donec feugiat metus sit','egestas','at',130,16,1,33,79,96),('Cadman Weaver','vel, venenatis vel,','Integer in magna.','arcu. Sed','blandit',73,33,2,9,80,97),('Echo Richardson','Cras vehicula aliquet','Mauris vestibulum, neque sed','Integer','ipsum',73,21,3,31,14,98),('Veda Flowers','mus. Donec dignissim','Nullam','sodales nisi','ultricies',38,30,4,21,73,99),('Bianca Park','in molestie tortor','sed','metus facilisis','et',153,26,1,9,66,100);




-- REVIEWS --
INSERT INTO reviews (id,name,rating,comment,author_id,product_id) VALUES (1,"vitae, erat. Vivamus",3,"magna a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc",38,19),(2,"risus. Quisque libero",2,"mollis. Phasellus libero mauris,",60,34),(3,"ut quam vel",2,"lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec nibh enim, gravida sit amet, dapibus",15,15),(4,"nisi nibh lacinia",1,"a ultricies adipiscing, enim mi tempor lorem, eget mollis lectus pede et",16,43),(5,"vitae, sodales at,",5,"Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse non leo. Vivamus nibh dolor, nonummy ac, feugiat non, lobortis quis,",18,41),(6,"egestas. Sed pharetra,",2,"elit, pellentesque a, facilisis non, bibendum sed, est. Nunc laoreet lectus",65,100),(7,"et ultrices posuere",4,"nunc sit amet metus. Aliquam erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer vulputate, risus a ultricies",24,44),(8,"augue. Sed molestie.",2,"interdum. Curabitur dictum. Phasellus in felis. Nulla tempor augue ac ipsum. Phasellus vitae",69,88),(9,"Donec consectetuer mauris",2,"magnis dis parturient montes, nascetur ridiculus mus. Proin vel arcu eu odio tristique",12,62),(10,"elementum, lorem ut",1,"semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare",17,82);
INSERT INTO reviews (id,name,rating,comment,author_id,product_id) VALUES (11,"arcu ac orci.",5,"auctor, velit eget laoreet posuere, enim nisl",31,63),(12,"tortor. Integer aliquam",3,"dignissim",44,32),(13,"ac, feugiat non,",2,"Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque",57,95),(14,"amet diam eu",3,"tellus lorem eu",12,45),(15,"orci, consectetuer euismod",1,"pede et risus. Quisque libero lacus, varius et, euismod et, commodo at, libero. Morbi accumsan",65,25),(16,"rutrum eu, ultrices",2,"Maecenas iaculis aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer urna. Vivamus molestie dapibus",11,22),(17,"elementum purus, accumsan",2,"id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis",48,72),(18,"nec ante. Maecenas",3,"ornare, elit elit fermentum risus, at fringilla purus mauris a nunc. In at",82,45),(19,"non, feugiat nec,",2,"primis in faucibus orci luctus",76,21),(20,"tempor lorem, eget",2,"Proin vel arcu eu odio tristique",77,83);
INSERT INTO reviews (id,name,rating,comment,author_id,product_id) VALUES (21,"accumsan sed, facilisis",2,"non, lacinia at, iaculis quis, pede. Praesent eu dui. Cum sociis natoque penatibus et magnis",52,61),(22,"lobortis, nisi nibh",1,"Donec nibh. Quisque nonummy ipsum non arcu. Vivamus sit amet risus. Donec egestas. Aliquam nec enim. Nunc ut erat. Sed nunc est, mollis non, cursus",17,32),(23,"adipiscing lobortis risus.",2,"ut odio",95,31),(24,"gravida molestie arcu.",2,"posuere vulputate, lacus. Cras interdum.",13,5),(25,"neque. Nullam nisl.",1,"facilisis lorem tristique aliquet. Phasellus fermentum convallis",88,71),(26,"Donec est. Nunc",4,"mus. Aenean eget magna. Suspendisse tristique neque venenatis lacus. Etiam bibendum fermentum metus. Aenean",32,87),(27,"rutrum lorem ac",3,"Duis a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet, erat nonummy ultricies ornare,",33,35),(28,"Fusce mollis. Duis",4,"posuere",47,9),(29,"ultrices a, auctor",5,"faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus ornare. Fusce mollis. Duis",6,29),(30,"sollicitudin a, malesuada",4,"fames ac turpis egestas. Aliquam",16,77);
INSERT INTO reviews (id,name,rating,comment,author_id,product_id) VALUES (31,"lectus pede et",5,"feugiat tellus lorem eu metus. In lorem. Donec elementum,",93,46),(32,"montes, nascetur ridiculus",2,"nisi. Aenean eget",99,94),(33,"pretium et, rutrum",3,"auctor. Mauris vel turpis. Aliquam adipiscing lobortis risus. In mi pede, nonummy ut, molestie in, tempus eu, ligula. Aenean euismod",4,95),(34,"vel, convallis in,",4,"egestas. Aliquam fringilla",15,28),(35,"et ipsum cursus",4,"vel arcu eu odio",51,86),(36,"aliquet, metus urna",2,"malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien. Cras dolor",80,75),(37,"erat, eget tincidunt",1,"sit amet, consectetuer adipiscing elit. Etiam laoreet, libero et",50,78),(38,"egestas nunc sed",2,"enim, sit amet ornare lectus justo eu arcu. Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices",5,28),(39,"orci tincidunt adipiscing.",2,"consectetuer, cursus et, magna. Praesent interdum ligula eu",62,98),(40,"at, egestas a,",2,"sit amet, consectetuer adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet ullamcorper. Duis at lacus. Quisque purus",85,68);
INSERT INTO reviews (id,name,rating,comment,author_id,product_id) VALUES (41,"tristique aliquet. Phasellus",1,"erat volutpat. Nulla facilisis. Suspendisse commodo tincidunt nibh. Phasellus nulla. Integer vulputate, risus",39,8),(42,"lobortis mauris. Suspendisse",4,"tellus eu augue porttitor interdum. Sed auctor odio a purus. Duis elementum,",100,14),(43,"Nam ligula elit,",3,"non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate",60,58),(44,"elementum, dui quis",2,"sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis felis. Donec tempor, est ac mattis semper,",94,85),(45,"Integer sem elit,",5,"non, hendrerit id, ante.",28,64),(46,"Praesent eu dui.",4,"magna a neque. Nullam ut nisi a odio semper cursus. Integer mollis. Integer tincidunt",52,13),(47,"tristique neque venenatis",1,"ad litora torquent per conubia nostra, per inceptos hymenaeos. Mauris ut quam vel",70,8),(48,"Maecenas libero est,",4,"mus. Aenean eget magna. Suspendisse",90,53),(49,"pellentesque, tellus sem",5,"cubilia Curae; Phasellus ornare. Fusce mollis. Duis",19,40),(50,"Nulla dignissim. Maecenas",2,"mauris blandit mattis. Cras eget nisi dictum augue malesuada malesuada. Integer id magna et ipsum cursus vestibulum. Mauris magna. Duis dignissim",33,52);
INSERT INTO reviews (id,name,rating,comment,author_id,product_id) VALUES (51,"venenatis lacus. Etiam",2,"urna convallis erat, eget tincidunt dui augue eu tellus. Phasellus elit pede, malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris id sapien.",1,80),(52,"non enim. Mauris",3,"lobortis quis, pede. Suspendisse dui.",23,98),(53,"Sed eu eros.",1,"nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est. Nunc",51,37),(54,"egestas. Aliquam nec",3,"Morbi non sapien molestie orci",22,29),(55,"dignissim lacus. Aliquam",5,"non, vestibulum nec, euismod in, dolor. Fusce",60,8),(56,"imperdiet nec, leo.",1,"amet orci. Ut sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis felis. Donec tempor,",15,62),(57,"Curabitur dictum. Phasellus",2,"Morbi sit amet massa. Quisque porttitor eros nec tellus. Nunc lectus pede, ultrices",99,36),(58,"purus. Nullam scelerisque",2,"lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Mauris ut quam vel sapien imperdiet ornare. In faucibus. Morbi vehicula.",97,43),(59,"dictum ultricies ligula.",5,"arcu. Vivamus sit",50,4),(60,"vel lectus. Cum",4,"tincidunt, nunc ac mattis ornare, lectus ante dictum mi, ac mattis velit justo nec ante. Maecenas mi felis, adipiscing",12,51);
INSERT INTO reviews (id,name,rating,comment,author_id,product_id) VALUES (61,"convallis, ante lectus",4,"mauris. Morbi non sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare, libero at auctor ullamcorper, nisl arcu iaculis enim, sit amet ornare",59,79),(62,"tempor arcu. Vestibulum",5,"Ut tincidunt orci quis lectus. Nullam",96,14),(63,"Cras vulputate velit",5,"massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede ac",6,23),(64,"imperdiet dictum magna.",5,"non magna. Nam ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc mauris sapien,",61,41),(65,"nulla ante, iaculis",2,"ridiculus mus. Donec dignissim magna a tortor. Nunc commodo auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis ultrices. Vivamus rhoncus. Donec est.",44,46),(66,"placerat, orci lacus",4,"consectetuer euismod est arcu ac orci.",16,73),(67,"ut, pellentesque eget,",3,"a, enim. Suspendisse aliquet, sem ut cursus luctus, ipsum leo elementum sem, vitae aliquam eros",44,33),(68,"magna nec quam.",4,"amet massa.",33,67),(69,"eu, accumsan sed,",2,"lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat. Etiam vestibulum massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede",71,17),(70,"tempus eu, ligula.",5,"rutrum non, hendrerit id, ante.",66,25);
INSERT INTO reviews (id,name,rating,comment,author_id,product_id) VALUES (71,"Suspendisse ac metus",5,"neque sed dictum eleifend, nunc risus varius orci, in consequat enim diam vel arcu. Curabitur ut odio vel est tempor bibendum.",34,30),(72,"risus. In mi",5,"luctus felis purus ac tellus. Suspendisse sed dolor. Fusce mi lorem, vehicula et, rutrum eu, ultrices sit amet, risus. Donec",56,29),(73,"ante dictum mi,",1,"tristique pharetra.",86,59),(74,"Maecenas libero est,",2,"semper cursus.",77,6),(75,"Aliquam vulputate ullamcorper",1,"lobortis",83,43),(76,"Integer in magna.",2,"vel arcu. Curabitur ut odio vel est tempor bibendum. Donec felis orci, adipiscing non, luctus sit amet, faucibus ut, nulla. Cras eu",40,37),(77,"nisl. Nulla eu",3,"metus facilisis lorem tristique aliquet. Phasellus fermentum convallis ligula. Donec luctus aliquet odio. Etiam ligula tortor,",85,99),(78,"posuere cubilia Curae;",1,"est, vitae sodales nisi magna sed dui. Fusce aliquam, enim nec tempus scelerisque, lorem ipsum sodales purus, in molestie",48,67),(79,"ac mattis semper,",4,"Etiam imperdiet dictum magna. Ut tincidunt orci quis lectus. Nullam suscipit, est",77,41),(80,"fermentum vel, mauris.",2,"sed dui. Fusce",87,13);
INSERT INTO reviews (id,name,rating,comment,author_id,product_id) VALUES (81,"Pellentesque tincidunt tempus",2,"eu erat semper rutrum. Fusce dolor quam, elementum at, egestas a, scelerisque sed, sapien. Nunc pulvinar arcu",7,25),(82,"turpis nec mauris",4,"montes, nascetur ridiculus",46,80),(83,"amet nulla. Donec",1,"Aliquam gravida mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet",12,96),(84,"non, hendrerit id,",3,"aliquet vel, vulputate eu, odio. Phasellus at augue id ante dictum cursus. Nunc mauris elit, dictum eu, eleifend nec,",65,59),(85,"sagittis felis. Donec",2,"Aenean euismod mauris eu elit. Nulla facilisi. Sed neque. Sed eget",49,85),(86,"velit in aliquet",4,"mauris ipsum porta elit, a",37,86),(87,"velit eu sem.",5,"tristique pharetra. Quisque ac libero nec ligula consectetuer rhoncus. Nullam velit dui, semper et,",7,8),(88,"dui. Fusce aliquam,",2,"in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus ornare. Fusce mollis. Duis sit amet diam eu dolor egestas rhoncus. Proin nisl sem, consequat",57,58),(89,"Sed dictum. Proin",4,"luctus et ultrices posuere cubilia Curae; Phasellus ornare. Fusce",30,70),(90,"Nullam nisl. Maecenas",5,"vestibulum lorem, sit amet ultricies sem magna nec quam. Curabitur vel lectus. Cum sociis",16,12);
INSERT INTO reviews (id,name,rating,comment,author_id,product_id) VALUES (91,"tincidunt pede ac",4,"varius orci, in consequat enim diam vel arcu. Curabitur",43,88),(92,"Proin vel arcu",1,"quam, elementum at, egestas",32,7),(93,"Duis dignissim tempor",5,"non nisi. Aenean eget metus. In nec orci. Donec nibh. Quisque nonummy ipsum non arcu. Vivamus",31,80),(94,"feugiat non, lobortis",4,"vulputate, posuere vulputate, lacus. Cras",34,47),(95,"dui, semper et,",5,"nibh lacinia orci, consectetuer euismod est arcu ac orci. Ut semper pretium",49,39),(96,"vitae, posuere at,",3,"risus. Donec nibh enim, gravida sit amet, dapibus id, blandit at, nisi. Cum sociis natoque penatibus",89,9),(97,"semper pretium neque.",2,"Etiam laoreet, libero et tristique pellentesque, tellus sem mollis dui, in sodales elit erat vitae risus. Duis",87,83),(98,"egestas ligula. Nullam",4,"urna. Ut tincidunt vehicula risus. Nulla eget metus eu erat semper rutrum. Fusce dolor",60,31),(99,"massa. Integer vitae",5,"erat volutpat. Nulla dignissim. Maecenas ornare egestas ligula. Nullam feugiat placerat velit. Quisque",49,37),(100,"luctus et ultrices",2,"rhoncus id, mollis nec, cursus",59,56);




-- PAYMENTRESULTS --




-- SHIPPINGADDRESSES --
INSERT INTO shippingaddresses (address,city,postal_code,country,id) VALUES ("Ap #208-4902 Lectus. Rd.","West Jordan","265488","Åland Islands",1),("Ap #527-3074 Ornare Ave","Huntsville","KH43 4IK","Andorra",2),("Ap #989-9987 Blandit Ave","Qualicum Beach","244706","Moldova",3),("202-7486 Nunc Avenue","Valverde","549727","El Salvador",4),("P.O. Box 660, 8473 Eros Avenue","Worcester","68304","Angola",5),("Ap #868-6553 Mattis Road","Tywyn","142067","Yemen",6),("6692 Neque. Av.","Wasseiges","319311","Sierra Leone",7),("Ap #702-7084 Egestas St.","Bidar","91482-214","Montenegro",8),("Ap #566-8354 Purus, Ave","Kraków","0342","French Guiana",9),("2343 Cubilia Av.","Mangalore","H9G 9T0","Taiwan",10);
INSERT INTO shippingaddresses (address,city,postal_code,country,id) VALUES ("597-7136 Pretium St.","Castello Tesino","66184-39272","Tajikistan",11),("Ap #626-5747 Arcu St.","LaSalle","02656-486","Isle of Man",12),("P.O. Box 322, 7727 Consectetuer St.","Livingston","29221","Nigeria",13),("Ap #815-6068 A Rd.","Frankston","421881","Samoa",14),("Ap #488-7984 Mollis. Ave","Delitzsch","4074","Bahrain",15),("Ap #533-9776 Ac Street","Osorno","40219","Dominican Republic",16),("407 Molestie. Rd.","Dunoon","L6Y 9FP","Denmark",17),("Ap #753-8582 Montes, Rd.","Viña del Mar","K1C 8E8","Belarus",18),("6364 Neque. Av.","Bhatinda","65300","Martinique",19),("P.O. Box 526, 5342 Eu Av.","Varanasi","16492","Algeria",20);
INSERT INTO shippingaddresses (address,city,postal_code,country,id) VALUES ("Ap #569-8400 Posuere Rd.","Hatfield","622315","Vanuatu",21),("9958 Augue St.","Montemilone","49842","Eritrea",22),("Ap #964-1337 Facilisis. Rd.","Ortacesus","252690","Zambia",23),("3317 Ipsum. Street","Chelsea","66-372","Monaco",24),("P.O. Box 484, 837 Dui St.","Villers-la-Tour","38496","Saint Pierre and Miquelon",25),("1421 Donec Avenue","Lac La Biche County","69170","Iraq",26),("4845 Turpis Street","Nurdağı","190017","Niue",27),("P.O. Box 425, 9300 Sed Ave","Reana del Rojale","2560","Monaco",28),("3729 Ac, St.","Alençon","49-388","Guam",29),("Ap #171-1347 Mollis Ave","Greifswald","36490","Slovenia",30);
INSERT INTO shippingaddresses (address,city,postal_code,country,id) VALUES ("620-9565 Fermentum Street","Emblem","4570","Macedonia",31),("907-6201 Est Road","Wellington","2278 ZK","New Caledonia",32),("912-6197 Et St.","Merrickville-Wolford","70654","Slovenia",33),("7283 Quisque Rd.","Soledad","458402","Belize",34),("P.O. Box 977, 8423 Ullamcorper Street","Lowell","71117","Georgia",35),("192-8324 Donec Street","Pelluhue","43611","Chile",36),("P.O. Box 821, 2331 Quis Av.","Medicine Hat","48285","Japan",37),("Ap #538-755 Ac Avenue","Ñiquén","73682-65422","Guinea-Bissau",38),("P.O. Box 817, 5217 Conubia St.","Wellingborough","67144","Greece",39),("938-7726 Mauris, Avenue","San Jose","9163","Jersey",40);
INSERT INTO shippingaddresses (address,city,postal_code,country,id) VALUES ("408-7135 Phasellus Street","Oudenburg","36-927","Cocos (Keeling) Islands",41),("957-9562 Ullamcorper. Avenue","Vallepietra","21722","Argentina",42),("810-323 Ornare Avenue","Katihar","P7B 4R6","Croatia",43),("Ap #843-1271 Proin Ave","Victoria","15-006","Heard Island and Mcdonald Islands",44),("P.O. Box 521, 9562 Suspendisse Rd.","Thurso","T3T 6G5","Monaco",45),("P.O. Box 359, 3154 Mi Ave","Ghislarengo","2394","Mali",46),("194-4098 Enim. Av.","Dudley","K0L 6C2","Zimbabwe",47),("Ap #372-9093 Lorem, Rd.","Labrecque","23539","Albania",48),("934-5679 Dictum Av.","Valenciennes","86662","Costa Rica",49),("177 Dictum Av.","Basildon","29873","Norfolk Island",50);
INSERT INTO shippingaddresses (address,city,postal_code,country,id) VALUES ("P.O. Box 347, 367 Vel Street","Yeongcheon","8727","Bosnia and Herzegovina",51),("713-8472 Donec Street","Whangarei","95150-93930","Belgium",52),("628-8007 Elit, Av.","Périgueux","70500","Bermuda",53),("P.O. Box 219, 6496 Turpis St.","Bouwel","851381","Libya",54),("Ap #189-8315 Nunc Rd.","Milnathort","46961","Namibia",55),("P.O. Box 926, 4835 Vehicula St.","Lot","471885","United States Minor Outlying Islands",56),("5139 Pharetra. St.","Bolsward","70605","Morocco",57),("P.O. Box 292, 1107 Cras Road","Shenkursk","43619","Korea, South",58),("4543 Cubilia Ave","Wellington","67843","Chile",59),("Ap #352-2836 Etiam Av.","Georgia","30814","Benin",60);
INSERT INTO shippingaddresses (address,city,postal_code,country,id) VALUES ("P.O. Box 151, 5165 Luctus Road","Norfolk County","4270","Cameroon",61),("Ap #765-2489 Mauris Rd.","Lauregno/Laurein","11270","Papua New Guinea",62),("652 Rutrum Ave","Caloundra","P3X 0H8","China",63),("Ap #562-9153 Maecenas Ave","Phoenix","718836","Myanmar",64),("P.O. Box 132, 5440 Dui. Road","Aiello Calabro","7654 KU","United Kingdom (Great Britain)",65),("Ap #777-1620 Gravida Av.","Kakisa","05614","Nepal",66),("Ap #229-6632 Interdum Avenue","Deline","53113","Northern Mariana Islands",67),("P.O. Box 640, 8529 Pharetra St.","Fossato Serralta","50263","Equatorial Guinea",68),("Ap #241-908 Urna. Rd.","Huaraz","61902","Belgium",69),("P.O. Box 699, 494 Ac Av.","Salon-de-Provence","18689","Mozambique",70);
INSERT INTO shippingaddresses (address,city,postal_code,country,id) VALUES ("P.O. Box 158, 2621 Faucibus Ave","Malartic","680048","Aruba",71),("P.O. Box 603, 6120 Penatibus Street","Kapelle-op-den-Bos","08211","Monaco",72),("P.O. Box 951, 1785 Ac Ave","Chakwal","8044","Somalia",73),("P.O. Box 946, 6227 Maecenas Av.","Belo Horizonte","36885-166","Nauru",74),("8820 Tincidunt, Ave","Ulsan","57752","Somalia",75),("P.O. Box 542, 1745 Sed Rd.","Springfield","578390","Ecuador",76),("934-8654 Molestie Avenue","Emarèse","37012","Antigua and Barbuda",77),("Ap #930-8942 Congue, Road","Leticia","59516","Micronesia",78),("P.O. Box 918, 6711 Vulputate St.","Grado","5040","Canada",79),("5714 Fermentum Road","Cap-Rouge","4599","Ireland",80);
INSERT INTO shippingaddresses (address,city,postal_code,country,id) VALUES ("326-9591 Donec Av.","Kawartha Lakes","517516","Bosnia and Herzegovina",81),("4871 Rhoncus. St.","Melipeuco","412502","Latvia",82),("Ap #874-6493 Etiam Avenue","Albany","9277","Faroe Islands",83),("515-6089 Donec Road","Fort Smith","441479","Mauritania",84),("4930 Vel Av.","Neelum Valley","61-843","Macedonia",85),("8758 Donec Road","Maransart","475365","Andorra",86),("7935 Fermentum Street","Waidhofen an der Ybbs","75154","Nepal",87),("576-3474 Et Rd.","Jonqui�re","9646 EV","Isle of Man",88),("Ap #150-7733 Eu Road","Isla de Pascua","3809","Slovakia",89),("P.O. Box 550, 5485 Dolor Avenue","Zielona Góra","636541","Virgin Islands, British",90);
INSERT INTO shippingaddresses (address,city,postal_code,country,id) VALUES ("P.O. Box 505, 8348 Sagittis. St.","Soma","4171","Côte D'Ivoire (Ivory Coast)",91),("500-1855 Faucibus Rd.","Maser","GO0 9EN","Costa Rica",92),("P.O. Box 811, 640 Ornare St.","Leverkusen","Z2846","Guam",93),("947-3991 Mollis Rd.","Rodez","321066","Guadeloupe",94),("Ap #242-4041 Erat. St.","Antwerpen","332370","Malta",95),("9502 Lorem Rd.","Limena","755868","Spain",96),("P.O. Box 691, 4016 Ac Street","Airdrie","J8P 6V0","Timor-Leste",97),("P.O. Box 636, 4918 Cras Street","Chakwal","L4J 6R9","Sri Lanka",98),("P.O. Box 128, 2153 Lobortis. Rd.","Hornsea","81542","American Samoa",99),("Ap #167-9480 Condimentum St.","Isle-aux-Coudres","65539","United States Minor Outlying Islands",100);




-- ORDERITEMS --



-- ORDERS --
