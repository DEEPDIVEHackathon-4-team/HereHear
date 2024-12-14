INSERT INTO region (id, city, district) VALUES
(1, 'Seoul', 'Gangnam-gu'),
(2, 'Seoul', 'Jongno-gu'),
(3, 'Incheon', 'Namdong-gu'),
(4, 'Busan', 'Haeundae-gu'),
(5, 'Daegu', 'Dalseo-gu'),
(6, 'Gwangju', 'Buk-gu'),
(7, 'Daejeon', 'Seo-gu'),
(8, 'Ulsan', 'Nam-gu'),
(9, 'Jeju', 'Jeju-si'),
(10, 'Suwon', 'Paldal-gu');


INSERT INTO users (id, nickname, email, password, heart_rate, latitude, longitude, region_id) VALUES
(1, 'user1', 'user1@example.com', 'password1', 72, 37.497942, 127.027621, 1), -- Gangnam-gu
(2, 'user2', 'user2@example.com', 'password2', 68, 37.579621, 126.977041, 2), -- Jongno-gu
(3, 'user3', 'user3@example.com', 'password3', 75, 37.463904, 126.704373, 3), -- Namdong-gu
(4, 'user4', 'user4@example.com', 'password4', 70, 35.158698, 129.160384, 4), -- Haeundae-gu
(5, 'user5', 'user5@example.com', 'password5', 65, 35.858826, 128.521530, 5), -- Dalseo-gu
(6, 'user6', 'user6@example.com', 'password6', 80, 35.174599, 126.911133, 6), -- Buk-gu, Gwangju
(7, 'user7', 'user7@example.com', 'password7', 71, 36.354964, 127.378782, 7), -- Seo-gu, Daejeon
(8, 'user8', 'user8@example.com', 'password8', 77, 35.543825, 129.316462, 8), -- Nam-gu, Ulsan
(9, 'user9', 'user9@example.com', 'password9', 69, 33.499774, 126.531179, 9), -- Jeju-si
(10, 'user10', 'user10@example.com', 'password10', 73, 37.281899, 127.046928, 10); -- Paldal-gu, Suwon