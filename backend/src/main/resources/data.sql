INSERT INTO region (code, name, parent_code) VALUES
(1100000000, '서울특별시', NULL),
(4100000000, '경기도', NULL),
(2600000000, '부산광역시', NULL),
(2700000000, '대구광역시', NULL),
(2800000000, '인천광역시', NULL),
(2900000000, '광주광역시', NULL),
(3000000000, '대전광역시', NULL),
(3100000000, '울산광역시', NULL),
(5100000000, '강원특별자치도', NULL),
(4400000000, '충청남도', NULL),
(4300000000, '충청북도', NULL),
(4800000000, '경상남도', NULL),
(4700000000, '충청북도', NULL),
(4600000000, '전라남도', NULL),
(5200000000, '전북특별자치도', NULL),
(5000000000, '제주특별자치도', NULL);

INSERT INTO region (code, name, parent_code) VALUES
(1111000000, '서울특별시 종로구', 1100000000),
(4113000000, '경기도 성남시', 4100000000),
(4113100000, '경기도 성남시 수정구', 4113000000),
(4113110100, '경기도 성남시 수정구 신흥동', 4113100000),
(4113110200, '경기도 성남시 수정구 태평동', 4113100000),
(4113110300, '경기도 성남시 수정구 수진동', 4113100000),
(4113110400, '경기도 성남시 수정구 단대동', 4113100000),
(4113110500, '경기도 성남시 수정구 산성동', 4113100000),
(4113110600, '경기도 성남시 수정구 양지동', 4113100000),
(4113110700, '경기도 성남시 수정구 복정동', 4113100000),
(4113110800, '경기도 성남시 수정구 창곡동', 4113100000),
(4113110900, '경기도 성남시 수정구 신촌동', 4113100000),
(4113111000, '경기도 성남시 수정구 오야동', 4113100000),
(4113111100, '경기도 성남시 수정구 심곡동', 4113100000),
(4113111200, '경기도 성남시 수정구 고등동', 4113100000),
(4113111300, '경기도 성남시 수정구 상적동', 4113100000),
(4113111400, '경기도 성남시 수정구 둔전동', 4113100000),
(4113111500, '경기도 성남시 수정구 시흥동', 4113100000),
(4113111600, '경기도 성남시 수정구 금토동', 4113100000),
(4113111700, '경기도 성남시 수정구 사송동', 4113100000);

INSERT INTO region (code, name, parent_code) VALUES
(4113500000, '경기도 성남시 분당구', 4113000000),
(4113510100, '경기도 성남시 분당구 분당동', 4113500000),
(4113510200, '경기도 성남시 분당구 수내동', 4113500000),
(4113510300, '경기도 성남시 분당구 정자동', 4113500000),
(4113510400, '경기도 성남시 분당구 율동', 4113500000),
(4113510500, '경기도 성남시 분당구 서현동', 4113500000),
(4113510600, '경기도 성남시 분당구 이매동', 4113500000),
(4113510700, '경기도 성남시 분당구 야탑동', 4113500000),
(4113510800, '경기도 성남시 분당구 판교동', 4113500000),
(4113510900, '경기도 성남시 분당구 삼평동', 4113500000),
(4113511000, '경기도 성남시 분당구 백현동', 4113500000),
(4113511100, '경기도 성남시 분당구 금곡동', 4113500000),
(4113511200, '경기도 성남시 분당구 궁내동', 4113500000),
(4113511300, '경기도 성남시 분당구 동원동', 4113500000),
(4113511400, '경기도 성남시 분당구 구미동', 4113500000),
(4113511500, '경기도 성남시 분당구 운중동', 4113500000),
(4113511600, '경기도 성남시 분당구 대장동', 4113500000),
(4113511700, '경기도 성남시 분당구 석운동', 4113500000),
(4113511800, '경기도 성남시 분당구 하산운동', 4113500000);

INSERT INTO region (code, name, parent_code) VALUES
(1111010100, '서울특별시 종로구 청운동', 1111000000),
(1111010200, '서울특별시 종로구 신교동', 1111000000),
(4146000000, '경기도 용인시', 4100000000),
(4146500000, '경기도 용인시 수지구', 4146000000);

INSERT INTO users (id, nickname, email, password, heart_rate, latitude, longitude, region_code)
VALUES
(1, '김현우', 'hyunWoo@example.com', 'pass', 80, 37.352143, 127.071681, 4146500000),
(2, '이지은', 'jieun@example.com', 'password1', 72, 37.402346,127.1008492, 4113510900),
(3, 'user2', 'user2@example.com', 'password2', 68, 37.579621, 126.977041, 1100000000),
(4, 'user3', 'user3@example.com', 'password3', 75, 37.463904, 126.704373, 1111000000),
(5, 'user4', 'user4@example.com', 'password4', 70, 35.158698, 129.160384, 1111010200);

INSERT INTO poster (id, title, contents, like_count, img, created_at, latitude, longitude, region_code, user_id, category, dislike_count, view_count)
VALUES
(1, '지금 우리 아파트만 정전인가요?', '밤에 자는데 온집안 전자제품들이 새로 켜지면서 띠리링 소리 나더라구요.  혹시 다른 아파트도 그랬나요?', 15, 'imageA.jpg', CURRENT_TIMESTAMP, 37.3384974, 127.0957044, 4146500000, 1, 'ACCIDENT', 0, 41),
(2, '마라톤 이벤트가 있다고 합니다', 'Details for Event A', 15, 'imageA.jpg', CURRENT_TIMESTAMP, 37.402361, 127.100861, 4113510900, 1, 'EVENT', 1, 100),
(3, '미금역 사거리 사고', '뉴스링크 https://m.news.nate.com/view/20241122n27975', 20, 'imageB.jpg', CURRENT_TIMESTAMP, 37.3500101, 127.1088885, 4113500000, 1, 'ACCIDENT', 0, 202),
(4, '좀전에 멧돼지 보신분??', 'Details for Event C', 10, 'imageC.jpg', CURRENT_TIMESTAMP, 37.3535055, 127.0758258, 4146500000, 2, 'RECENT_ISSUE', 1, 404),
(5, '말티즈 주인분 찾았습니다!', 'Details for Event D', 25, 'imageD.jpg', CURRENT_TIMESTAMP, 37.388183, 127.121093, 4113511600, 3, 'MISSING', 0, 39),
(6, '소방차가 지나가던데 무슨일 인가요?', 'Details for Event D', 25, 'imageD.jpg', CURRENT_TIMESTAMP, 37.388183, 127.121093, 4113511600, 3, 'RECENT_ISSUE', 0, 20),
(7, '여기 위치 폭설로 가로수가 넘어져있네요. 조심하세요', 'Details for Event E', 5, 'imageE.jpg', CURRENT_TIMESTAMP, 37.310556, 127.095556, 4146500000, 4, 'ACCIDENT', 2, 20),
(8, '오늘 판교역 무슨일 있나요?', 'Details for Event E', 5, 'imageE.jpg', CURRENT_TIMESTAMP, 37.394539, 127.111016, 4113500000, 4, 'RECENT_ISSUE', 0, 299),
(9, '길냥이 아기고양이가 탄천에서 헤매요.', 'Details for Event E', 5, 'imageE.jpg', CURRENT_TIMESTAMP, 37.343300, 127.097393, 4113511300, 4, 'RECENT_ISSUE', 0, 299);

INSERT INTO comment (id, poster_id, user_id, content, created_at)
VALUES
(1, 1, 1, '저희 아파트도 새벽 3시 좀 넘은시간에 정전이었어요', CURRENT_TIMESTAMP),
(2, 1, 2, '이런', CURRENT_TIMESTAMP),
(3, 1, 2, '관리실에 문의해보니 저희 근처가 다 그런가봐요', CURRENT_TIMESTAMP);

SELECT setval('poster_id_seq', (SELECT MAX(id) FROM poster));
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('comment_id_seq', (SELECT MAX(id) FROM users));