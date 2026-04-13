package com.student.demo

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@SpringBootApplication
@RestController
class DemoApplication

fun main() {
    runApplication<DemoApplication>()
}

@GetMapping("/")
fun hello() = "项目启动成功！"