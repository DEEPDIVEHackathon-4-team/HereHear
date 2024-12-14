INSERT INTO region (code, name, parent_code) VALUES (1100000000, '서울특별시', NULL);
INSERT INTO region (code, name, parent_code) VALUES (1111000000, '서울특별시 종로구', 1100000000);
INSERT INTO region (code, name, parent_code) VALUES (1111010100, '서울특별시 종로구 청운동', 1111000000);
INSERT INTO region (code, name, parent_code) VALUES (1111010200, '서울특별시 종로구 신교동', 1111000000);


INSERT INTO users (id, nickname, email, password, heart_rate, latitude, longitude, region_code)
VALUES
(1, 'user1', 'user1@example.com', 'password1', 72, 37.497942, 127.027621, 1100000000),
(2, 'user2', 'user2@example.com', 'password2', 68, 37.579621, 126.977041, 1100000000),
(3, 'user3', 'user3@example.com', 'password3', 75, 37.463904, 126.704373, 1111000000),
(4, 'user4', 'user4@example.com', 'password4', 70, 35.158698, 129.160384, 1111010200);

INSERT INTO poster (id, title, contents, like_count, img, created_at, latitude, longitude, region_code, user_id, category)
VALUES
(1, 'Poster 1', 'Contents for Poster 1', 10, 'image1.jpg', CURRENT_TIMESTAMP, 37.497942, 127.027621, 1100000000, 1, 'EVENT'),
(2, 'Poster 2', 'Contents for Poster 2', 5, 'image2.jpg', CURRENT_TIMESTAMP, 35.158698, 129.160384, 1100000000, 2, 'ACCIDENT'),
(3, 'Poster 3', 'Contents for Poster 3', 8, 'image3.jpg', CURRENT_TIMESTAMP, 37.579621, 126.977041, 1111010200, 3, 'RECENT_ISSUE'),
(4, 'Poster 4', 'Contents for Poster 4', 15, 'image4.jpg', CURRENT_TIMESTAMP, 35.858826, 128.521530, 1111000000, 4, 'EVENT');

SELECT setval('poster_id_seq', (SELECT MAX(id) FROM poster));
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));