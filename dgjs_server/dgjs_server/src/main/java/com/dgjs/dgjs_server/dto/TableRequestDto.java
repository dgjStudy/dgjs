package com.dgjs.dgjs_server.dto; // 경진님의 실제 dgjs_server 패키지 경로에 맞게 수정

import java.util.List;

public class TableRequestDto {
    private String tableName;
    private List<ColumnInfo> columns;

    public String getTableName() { return tableName; }
    public void setTableName(String tableName) { this.tableName = tableName; }
    public List<ColumnInfo> getColumns() { return columns; }
    public void setColumns(List<ColumnInfo> columns) { this.columns = columns; }

    public static class ColumnInfo {
        private String name;
        private String type;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
    }
}