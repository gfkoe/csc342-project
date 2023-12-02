CREATE TABLE IF NOT EXISTS `user` (
  `usr_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `usr_first_name` varchar(100) NOT NULL,
  `usr_last_name` varchar(100) NOT NULL,
  `usr_username` varchar(150) NOT NULL,
  `usr_password` varchar(255) NOT NULL,
  `usr_salt` varchar(100) NOT NULL,
  `usr_avatar` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DELETE FROM `user`;
INSERT INTO `user` (`usr_id`, `usr_first_name`, `usr_last_name`, `usr_username`, `usr_password`, `usr_salt`, `usr_avatar`) VALUES
	(1, 'Stu', 'Dent', 'student', '83d9bdb5e20f3571b087db9aabf190a296741c3e864d7742f35658cfccc1b79c4599aad25084aa9a28c649a50c92244227b3e53e197621301d619d1ea01873c4', '48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9', 'https://robohash.org/veniamdoloresenim.png?size=64x64&set=set1'),
	(2, 'Gra', 'Duate', 'graduate', 'e289219c34f9a32ebc82393f09719b7f34872de95463242b5ffe8bb4b11a5fe7d454f9f5d082c8207c5d69b220ba06624b4bb15ffa05cc7d7d53c43f9e96da6a', '801e87294783281ae49fc8287a0fd86779b27d7972d3e84f0fa0d826d7cb67dfefc', 'https://robohash.org/nullaautemin.png?size=64x64&set=set1');


CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `date` varchar(32) NOT NULL,
  `timestamp` varchar(32) NOT NULL,
  `week` int(10) unsigned NOT NULL,
  `home_team_id` int(10) unsigned NOT NULL,
  `away_team_id` int(10) unsigned NOT NULL,
  `status` varchar(2) NOT NULL,
  `final_home_score` int(10) unsigned NOT NULL,
  `final_away_score` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/** NS = not started, FT = finished */
INSERT INTO `games` (`id`, `date`, `timestamp`, `week`, `home_team_id`, `away_team_id`, `status`, `final_home_score`, `final_away_score`) VALUES
(1, '', '', 1, 1, 2, 'FT', 1, 1),
(2, '', '', 1, 1, 2, 'FT', 1, 1);


CREATE TABLE IF NOT EXISTS `teams` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `league` varchar(3) NOT NULL,
  `name` varchar(32) NOT NULL,
  `abbreviation` char(3) NOT NULL,
  `conference` char(4) NOT NULL,
  `division` char(8) NOT NULL,
  `logo` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `teams` (`id`, `league`, `name`, `abbreviation`, `conference`, `division`, `logo`) VALUES
(1, 'NFL', 'Arizona Cardinals', 'ARI', 'NFC', 'West', ''),
(2, 'NFL', 'Atlanta Falcons', 'ATL', 'NFC', 'South', ''),
(3, 'NFL', 'Baltimore Ravens', 'BAL', 'AFC', 'North', ''),
(4, 'NFL', 'Buffalo Bills', 'BUF', 'AFC', 'East', ''),
(5, 'NFL', 'Carolina Panthers', 'CAR', 'NFC', 'South', ''),
(6, 'NFL', 'Chicago Bears', 'CHI', 'NFC', 'North', ''),
(7, 'NFL', 'Cincinnati Bengals', 'CIN', 'AFC', 'North', ''),
(8, 'NFL', 'Cleveland Browns', 'CLE', 'AFC', 'North', ''),
(9, 'NFL', 'Dallas Cowboys', 'DAL', 'NFC', 'East', ''),
(10, 'NFL', 'Denver Broncos', 'DEN', 'AFC', 'West', ''),
(11, 'NFL', 'Detroit Lions', 'DET', 'NFC', 'North', ''),
(12, 'NFL', 'Green Bay Packers', 'GB', 'NFC', 'North', ''),
(13, 'NFL', 'Houston Texans', 'HOU', 'AFC', 'South', ''),
(14, 'NFL', 'Indianapolis Colts', 'IND', 'AFC', 'South', ''),
(15, 'NFL', 'Jacksonville Jaguars', 'JAX', 'AFC', 'South', ''),
(16, 'NFL', 'Kansas City Chiefs', 'KC', 'AFC', 'West', ''),
(17, 'NFL', 'Miami Dolphins', 'MIA', 'AFC', 'East', ''),
(18, 'NFL', 'Minnesota Vikings', 'MIN', 'NFC', 'North', ''),
(19, 'NFL', 'New England Patriots', 'NE', 'AFC', 'East', ''),
(20, 'NFL', 'New Orleans Saints', 'NO', 'NFC', 'South', ''),
(21, 'NFL', 'NY Giants', 'NYG', 'NFC', 'East', ''),
(22, 'NFL', 'NY Jets', 'NYJ', 'AFC', 'East', ''),
(23, 'NFL', 'Oakland Raiders', 'OAK', 'AFC', 'West', ''),
(24, 'NFL', 'Philadelphia Eagles', 'PHI', 'NFC', 'East', ''),
(25, 'NFL', 'Pittsburgh Steelers', 'PIT', 'AFC', 'North', ''),
(26, 'NFL', 'San Diego Chargers', 'SD', 'AFC', 'West', ''),
(27, 'NFL', 'San Francisco 49ers', 'SF', 'NFC', 'West', ''),
(28, 'NFL', 'Seattle Seahawks', 'SEA', 'NFC', 'West', ''),
(29, 'NFL', 'St. Louis Rams', 'STL', 'NFC', 'West', ''),
(30, 'NFL', 'Tampa Bay Buccaneers', 'TB', 'NFC', 'South', ''),
(31, 'NFL','Tennessee Titans', 'TEN', 'AFC', 'South', ''),
(32, 'NFL', 'Washington Commanders', 'WAS', 'NFC', 'East', ''),
(33, 'NBA', 'Atlanta Hawks', 'ATL', 'East', '', ''),
(34, 'NBA', 'Boston Celtics', 'BOS', 'East', '', ''),
(35, 'NBA', 'Charlotte Hornets', 'CHA', 'East', '', ''),
(36, 'NBA', 'Chicago Bulls', 'CHI', 'East', '', ''),
(37, 'NBA', 'Cleveland Cavaliers', 'CLE', 'East', '', ''),
(38, 'NBA', 'Dallas Mavericks', 'DAL', 'West', '', ''),
(39, 'NBA', 'Denver Nuggets', 'DEN', 'West', '', ''),
(40, 'NBA', 'Detroit Pistons', 'DET', 'East', '', ''),
(41, 'NBA', 'Golden State Warriors', 'GSW', 'West', '', ''),
(42, 'NBA', 'Houston Rockets', 'HOU', 'West', '', ''),
(43, 'NBA', 'Indiana Pacers', 'IND', 'East', '', ''),
(44, 'NBA', 'Los Angeles Clippers', 'LAC', 'West', '', ''),
(45, 'NBA', 'Los Angeles Lakers', 'LAL', 'West', '', ''),
(46, 'NBA', 'Memphis Grizzlies', 'MEM', 'West', '', ''),
(47, 'NBA', 'Miami Heat', 'MIA', 'East', '', ''),
(48, 'NBA', 'Milwaukee Bucks', 'MIL', 'East', '', ''),
(49, 'NBA', 'Minnesota Timberwolves', 'MIN', 'West', '', ''),
(50, 'NBA', 'New Orleans Pelicans', 'NOP', 'West', '', ''),
(51, 'NBA', 'New York Knicks', 'NYK', 'East', '', ''),
(52, 'NBA', 'Brooklyn Nets', 'BKN', 'East', '', ''),
(53, 'NBA', 'Oklahoma City Thunder', 'OKC', 'West', '', ''),
(54, 'NBA', 'Orlando Magic', 'ORL', 'East', '', ''),
(55, 'NBA', 'Philadelphia 76ers', 'PHI', 'East', '', ''),
(56, 'NBA', 'Phoenix Suns', 'PHO', 'West', '', ''),
(57, 'NBA', 'Portland Trail Blazers', 'POR', 'West', '', ''),
(58, 'NBA', 'Sacramento Kings', 'SAC', 'West', '', ''),
(59, 'NBA', 'San Antonio Spurs', 'SAS', 'West', '', ''),
(60, 'NBA', 'Toronto Raptors', 'TOR', 'East', '', ''),
(61, 'NBA', 'Utah Jazz', 'UTH', 'West', '', ''),
(62, 'NBA', 'Washington Wizards', 'WAS', 'East', '', ''),
(63, 'MLB', 'Arizona Diamondbacks', 'ARI', 'NL', 'West', ''),
(64, 'MLB', 'Atlanta Braves', 'ATL', 'NL', 'East', ''),
(65, 'MLB', 'Baltimore Orioles', 'BAL', 'AL', 'East', ''),
(66, 'MLB', 'Boston Red Sox', 'BOS', 'AL', 'East', ''),
(67, 'MLB', 'Chicago White Sox', 'CWS', 'AL', 'Cent', ''),
(68, 'MLB', 'Chicago Cubs', 'CHC', 'NL', 'Cent', ''),
(69, 'MLB', 'Cinncinnati Reds', 'CIN', 'NL', 'Cent', ''),
(70, 'MLB', 'Cleveland Guardians', 'CLE', 'AL', 'Cent', ''),
(71, 'MLB', 'Colorado Rockies', 'COL', 'NL', 'West', ''),
(72, 'MLB', 'Detroit Tigers', 'DET', 'AL', 'Cent', ''),
(73, 'MLB', 'Houston Astros', 'HOU', 'AL', 'West', ''),
(74, 'MLB', 'Kansas City Royals', 'KC', 'AL', 'Cent', ''),
(75, 'MLB', 'Los Angeles Angels', 'LAA', 'AL', 'West', ''),
(76, 'MLB', 'Los Angeles Dodgers', 'LAD', 'NL', 'West', ''),
(77, 'MLB', 'Miami Marlins', 'MIA', 'NL', 'East', ''),
(78, 'MLB', 'Milwaukee Brewers', 'MIL', 'NL', 'Cent', ''),
(79, 'MLB', 'Minnesota Twins', 'MIN', 'AL', 'Cent', ''),
(80, 'MLB', 'New York Mets', 'NYM', 'NL', 'East', ''),
(81, 'MLB', 'New York Yankees', 'NYY', 'AL', 'East', ''),
(82, 'MLB', 'Oakland Athletics', 'OAK', 'AL', 'West', ''),
(83, 'MLB', 'Philadelphia Phillies', 'PHI', 'NL', 'East', ''),
(84, 'MLB', 'Pittsburgh Pirates', 'PIT', 'NL', 'Cent', ''),
(85, 'MLB', 'San Diego Padres', 'SD', 'NL', 'West', ''),
(86, 'MLB', 'San Francisco Giants', 'SF', 'NL', 'West', ''),
(87, 'MLB', 'Seattle Mariners', 'SEA', 'AL', 'West', ''),
(88, 'MLB', 'St. Louis Cardinals', 'STL', 'NL', 'Cent', ''),
(89, 'MLB', 'Tampa Bay Rays', 'TB', 'AL', 'East', ''),
(90, 'MLB', 'Texas Rangers', 'TEX', 'AL', 'West', ''),
(91, 'MLB', 'Toronto Blue Jays', 'TOR', 'AL', 'East', ''),
(92, 'MLB', 'Washington Nationals', 'WAS', 'NL', 'East', ''),
(93, 'MLS', 'Atlanta United FC', '', 'East', '', ''),
(94, 'MLS', 'Austin FC', '', 'West', '', ''),
(95, 'MLS', 'CF Montréal', '', 'East', '', ''),
(96, 'MLS', 'Charlotte FC', '', 'East', '', ''),
(97, 'MLS', 'Chicago Fire FC', '', 'East', '', ''),
(98, 'MLS', 'Colorado Rapids', '', 'West', '', ''),
(99, 'MLS', 'Columbus Crew', '', 'East', '', ''),
(100, 'MLS', 'D.C. United', '', 'East', '', ''),
(101, 'MLS', 'FC Cincinnati', '', 'East', '', ''),
(102, 'MLS', 'FC Dallas', '', 'West', '', ''),
(103, 'MLS', 'Houston Dynamo FC', '', 'West', '', ''),
(104, 'MLS', 'Inter Miami CF', '', 'East', '', ''),
(105, 'MLS', 'LA Galaxy', '', 'West', '', ''),
(106, 'MLS', 'Los Angeles FC', '', 'West', '', ''),
(107, 'MLS', 'Minnesota United FC', '', 'West', '', ''),
(108, 'MLS', 'Nashville SC', '', 'East', '', ''),
(109, 'MLS', 'New England Revolution', '', 'East', '', ''),
(110, 'MLS', 'New York City FC', '', 'East', '', ''),
(111, 'MLS', 'New York Red Bulls', '', 'East', '', ''),
(112, 'MLS', 'Orlando City SC', '', 'East', '', ''),
(113, 'MLS', 'Philadelphia Union', '', 'East', '', ''),
(114, 'MLS', 'Portland Timbers', '', 'West', '', ''),
(115, 'MLS', 'Real Salt Lake', '', 'West', '', ''),
(116, 'MLS', 'San Jose Earthquakes', '', 'West', '', ''),
(117, 'MLS', 'Seattle Sounders FC', '', 'West', '', ''),
(118, 'MLS', 'Sporting Kansas City', '', 'West', '', ''),
(119, 'MLS', 'St. Louis City SC', '', 'West', '', ''),
(120, 'MLS', 'Toronto FC', '', 'East', '', ''),
(121, 'MLS', 'Vancouver Whitecaps', '', 'West', '', '');