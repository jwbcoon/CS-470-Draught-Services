for file in ./schemas/*.sql
do
    tr '`' '"' < "$file" |
        sed 's/\([a-zA-Z]\)\?\\'\''\([a-zA-Z]\)\?/\1'\'''\''\2/g' |
        sed 's/use\s/-- use/' | sed 's/\(INT\|int([0-9]\+)\) NOT NULL AUTO_INCREMENT/SERIAL/' |
        sed 's/USING BTREE//' | sed 's/\(DATETIME\|datetime\)/TIMESTAMP/' |
        sed 's/\(tinyint\|TINYINT\)/SMALLINT/' |
        sed 's/ COLLATE utf8mb4_general_ci//' | 
        sed 's/ ENGINE=InnoDB \(AUTO_INCREMENT=[0-9]\+ \)*DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci//' |
        sed 's/LOCK TABLES "[a-zA-Z_]\+" WRITE;/BEGIN;/' | sed 's/UNLOCK TABLES;/COMMIT;/' > "$file.tmp"
    mv "$file.tmp" "$file"
done

for file in ./dumps/*.sql
do
    tr '`' '"' < "$file" |
        sed 's/\([a-zA-Z]\)\?\\'\''\([a-zA-Z]\)\?/\1'\'''\''\2/g' |
        sed 's/use\s/-- use/' | sed 's/\(INT\|int([0-9]\+)\) NOT NULL AUTO_INCREMENT/SERIAL/' |
        sed 's/USING BTREE//' | sed 's/\(DATETIME\|datetime\)/TIMESTAMP/' |
        sed 's/\(tinyint\|TINYINT\)/SMALLINT/' |
        sed 's/ COLLATE utf8mb4_general_ci//' | 
        sed 's/ ENGINE=InnoDB \(AUTO_INCREMENT=[0-9]\+ \)*DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci//' |
        sed 's/LOCK TABLES "[a-zA-Z_]\+" WRITE;/BEGIN;/' | sed 's/UNLOCK TABLES;/COMMIT;/' > "$file.tmp"
    mv "$file.tmp" "$file"
done

