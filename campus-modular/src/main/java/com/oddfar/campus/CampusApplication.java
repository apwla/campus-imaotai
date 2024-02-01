package com.oddfar.campus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.ZoneOffset;
import java.util.TimeZone;

/**
 * GitHub: https://github.com/oddfar/campus-imaotai
 * @author oddfar
 */
@SpringBootApplication
public class CampusApplication {

    public static void main(String[] args) {
        //设置+8时区，避免因为时区问题导致预约时间不正确
        // Spring Boot应用启动的时候，设置Java虚拟机（JVM）的默认时区;
        // 它通过TimeZone.getTimeZone(ZoneOffset.of("+8"))创建了一个表示UTC+8时区的TimeZone对象。ZoneOffset.of("+8")是基于Java 8引入的java.time包的API，用于表示从UTC时区偏移+8小时的时区偏移量。
        // 然后，这个时区对象被设置为整个Java虚拟机的默认时区
        TimeZone.setDefault(TimeZone.getTimeZone(ZoneOffset.of("+8")));
        SpringApplication.run(CampusApplication.class, args);
    }

}
