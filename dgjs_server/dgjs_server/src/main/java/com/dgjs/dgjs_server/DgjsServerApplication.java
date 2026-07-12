package com.dgjs.dgjs_server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration; // 👈 추가 확인

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class}) // 👈 이 부분을 넣어줍니다!
public class DgjsServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(DgjsServerApplication.class, args);
	}
}