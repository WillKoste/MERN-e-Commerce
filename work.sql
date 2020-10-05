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











