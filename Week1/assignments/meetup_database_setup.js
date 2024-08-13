// Import the mysql package
const mysql = require('mysql');

// MySQL connection configuration
const con = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL!');
}); 

// Drops the 'meetup' database if it already exists
con.query('DROP DATABASE IF EXISTS meetup', (err)=> {
    if (err) throw err;
    console.log('Database dropped or does not exist. Creating a new one.');
 });

 // Create a new 'meetup' database
con.query('CREATE DATABASE meetup', (err)=> {
    if (err) throw err;
    console.log('Database created: meetup');

    // Switch to the 'meetup' database
    con.changeUser({ database: 'meetup'}, (err)=> {
        if (err) throw err;
        console.log("Switched to database 'meetup'");
        
        // Create Invitee table
        const createInviteeTableQuery = `
            CREATE TABLE IF NOT EXISTS Invitee (
                invitee_no INT NOT NULL AUTO_INCREMENT,
                invitee_name VARCHAR(45) NOT NULL,
                invited_by VARCHAR(45) NOT NULL,
                PRIMARY KEY (invitee_no)
            );
        `;

        con.query(createInviteeTableQuery, (err)=> {
            if(err) throw err;
            console.log("Invitee table created successfully!");

            // Create Room table
            const createRoomTableQuery = `
                CREATE TABLE IF NOT EXISTS Room (
                    room_no INT NOT NULL AUTO_INCREMENT,
                    room_name VARCHAR(45) NOT NULL,
                    floor_number INT NOT NULL,
                    PRIMARY KEY (room_no)
                );
            `;

            con.query(createRoomTableQuery, (err)=> {
                if(err) throw err;
                console.log("Room table created successfully!");

                // Create Meeting table    
                const createMeetingTableQuery = `
                    CREATE TABLE IF NOT EXISTS Meeting (
                        meeting_no INT NOT NULL AUTO_INCREMENT,
                        meeting_title VARCHAR(255) NOT NULL,
                        starting_time DATETIME NOT NULL,
                        ending_time DATETIME NOT NULL,
                        room_no INT NOT NULL,
                        PRIMARY KEY (meeting_no),
                        FOREIGN KEY (room_no) REFERENCES Room(room_no)
                    );
                `;

                con.query(createMeetingTableQuery, (err)=> {
                    if(err) throw err;
                    console.log("Meeting table created successfully!");

                    // Insert 5 rows into Invitee table
                    const insertInviteesQuery = `
                        INSERT INTO Invitee (invitee_name, invited_by) VALUES
                            ('Alice Smith', 'Bob Davis'),
                            ('Charlie Johnson', 'David Wilson'),
                            ('Eve Williams', 'Frank Walker'),
                            ('Grace Brown', 'Henry Clark'),
                            ('Ivy Jones', 'Jack Taylor');
                    `;

                    con.query(insertInviteesQuery, (err) => {
                        if (err) throw err;
                        console.log('Rows inserted into Invitee table');

                        // Insert 5 rows into Room table
                        const insertRoomsQuery = `
                            INSERT INTO Room (room_name, floor_number) VALUES
                                ('Meeting Room 1', 1),
                                ('Conference Room A', 2),
                                ('Board Room X', 3),
                                ('Training Room B', 1),
                                ('Lounge Area', 4);
                        `;

                        con.query(insertRoomsQuery, (err) => {
                            if (err) throw err;
                            console.log('Rows inserted into Room table');

                            // Insert 5 rows into Meeting table
                            const insertMeetingsQuery = `
                                INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
                                    ('Project Kickoff', '2024-09-01 09:00:00', '2024-09-01 10:00:00', 1),
                                    ('Team Standup', '2024-09-02 10:00:00', '2024-09-02 10:30:00', 2),
                                    ('Client Meeting', '2024-09-03 14:00:00', '2024-09-03 15:00:00', 3),
                                    ('Brainstorming Session', '2024-09-04 16:00:00', '2024-09-04 17:00:00', 4),
                                    ('Board Meeting', '2024-09-05 11:00:00', '2024-09-05 12:00:00', 5);
                            `;

                            con.query(insertMeetingsQuery, (err) => {
                                if (err) throw err;
                                console.log('Rows inserted into Meeting table');

                                // Close the connection 
                                con.end();
                            });           
                        });
                    });
                });        
            });     
        });
    });
});
