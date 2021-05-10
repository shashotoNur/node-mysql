const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection(
    {
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'nodemysql'
    });

// Connect
db.connect( err =>
{
    if(err) throw err;
    console.log('MySql Connected...');
});

const app = express();

// Create DB
app.get('/createdb', (_req, res) =>
    {
        let sql = 'CREATE DATABASE nodemysql';

        db.query(sql, (err, result) =>
        {
            if(err) throw err;
            console.log(result);
            res.send('Database created...');
        });
    });

// Create table
app.get('/createpoststable', (_req, res) =>
    {
        let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
        db.query(sql, (err, result) =>
            {
                if(err) throw err;
                console.log(result);
                res.send('Posts table created...');
            });
    });

// Insert post 1
app.get('/addpost1', (_req, res) =>
    {
        let post = { title:'Post One', body:'This is post number one' };
        let sql = 'INSERT INTO posts SET ?';

        db.query(sql, post, (err, result) =>
            {
                if(err) throw err;
                console.log(result);
                res.send('Post 1 added...');
            });
    });

// Insert post 2
app.get('/addpost2', (_req, res) =>
    {
        let post = {title:'Post Two', body:'This is post number two'};
        let sql = 'INSERT INTO posts SET ?';
        db.query(sql, post, (err, result) =>
            {
                if(err) throw err;
                console.log(result);
                res.send('Post 2 added...');
            });
    });

// Get posts
app.get('/get', (_req, res) =>
    {
        let sql = 'SELECT * FROM posts';
        db.query(sql, (err, results) =>
            {
                if(err) throw err;
                console.log(results);
                res.send('Posts fetched...');
            });
    });

// Get single post
app.get('/get/:id', (req, res) =>
    {
        let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
        db.query(sql, (err, result) =>
            {
                if(err) throw err;
                console.log(result);
                res.send('Post fetched...');
            });
    });

// Update post
app.get('/update/:id', (req, res) =>
    {
        let newTitle = 'Updated Title';
        let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
        db.query(sql, (err, result) =>
            {
                if(err) throw err;
                console.log(result);
                res.send('Post updated...');
            });
    });

// Delete post
app.get('/delete/:id', (req, res) =>
    {
        let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
        db.query(sql, (err, result) =>
            {
                if(err) throw err;
                console.log(result);
                res.send('Post deleted...');
            });
    });


app.listen('3000', () => { console.log('Server started on port 3000'); });