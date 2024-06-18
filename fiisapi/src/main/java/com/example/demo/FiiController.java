package com.example.demo;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FiiController {
    private final FiiService fiiService;

    public FiiController(FiiService fiiService) {
        this.fiiService = fiiService;
    }

    @GetMapping("/fiis")
    public List<Fii> getFiis() {
        return fiiService.getAllFiis();
    }
}