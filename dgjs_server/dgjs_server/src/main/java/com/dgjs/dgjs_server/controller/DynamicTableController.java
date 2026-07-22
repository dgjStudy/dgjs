package com.dgjs.dgjs_server.controller; // 패키지 경로 확인

import com.dgjs.dgjs_server.dto.TableRequestDto;
import com.dgjs.dgjs_server.service.DynamicTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// 커밋 확인용 주석

@RestController
@RequestMapping("/api/tables")
@CrossOrigin(origins = "http://localhost:3000") // 리액트(dgjs_platform) 포트 허용
public class DynamicTableController {

    @Autowired
    private DynamicTableService dynamicTableService;

    @PostMapping
    public ResponseEntity<String> createTable(@RequestBody TableRequestDto requestDto) {
        try {
            dynamicTableService.createDynamicTable(requestDto);
            return ResponseEntity.ok("테이블 생성 및 메타데이터 등록 성공!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("실패: " + e.getMessage());
        }
    }
}