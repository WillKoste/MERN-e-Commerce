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
	numReviews int
)


insert into products
(name, image, description, brand, category, price, countinstock, rating, numreviews, user_id)
values ('Really Big Boat', '/images/boat.jpg', 'This boat is so pretty!! Like 4realz. Buy the boat - you will be happy!!!', 'BoatLand', 'Boats', 15642.99, 2, 3.8, 7, 4)




alter table products alter column image set default '/images/placeholder.png';



alter table products alter column user_id set not null;



alter table products add column user_id int references users(id)




alter table products
	add column created_at date
	default now();


alter table products 
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
	isAdmin bool default false not null
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

