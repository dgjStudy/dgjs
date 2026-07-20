package com.dgjs.dgjs_server.service; // 패키지 경로 확인

import com.dgjs.dgjs_server.dto.TableRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DynamicTableService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Transactional
    public void createDynamicTable(TableRequestDto dto) {
        // 1. 실제 물리 테이블 생성용 SQL 조립
        StringBuilder sql = new StringBuilder();
        sql.append("CREATE TABLE ").append(dto.getTableName()).append(" (");
        sql.append("id INT AUTO_INCREMENT PRIMARY KEY, ");

        for (int i = 0; i < dto.getColumns().size(); i++) {
            TableRequestDto.ColumnInfo col = dto.getColumns().get(i);
            sql.append(col.getName()).append(" ").append(col.getType());
            if (i < dto.getColumns().size() - 1) {
                sql.append(", ");
            }
        }
        sql.append(");");

        // 2. DB에 진짜 물리 테이블 생성 실행
        jdbcTemplate.execute(sql.toString());

        // 3. 메타데이터(장부) 테이블에 생성 이력 기록
        String metadataSql = "INSERT INTO table_metadata (table_name, display_name) VALUES (?, ?)";
        jdbcTemplate.update(metadataSql, dto.getTableName(), dto.getTableName());
    }
}