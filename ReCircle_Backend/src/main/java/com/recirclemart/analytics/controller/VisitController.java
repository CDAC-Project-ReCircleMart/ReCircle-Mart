package com.recirclemart.analytics.controller;

import com.recirclemart.analytics.entity.Visit;
import com.recirclemart.analytics.service.VisitService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/visits")
public class VisitController {

    @Autowired
    private VisitService visitService;

    @PostMapping
    public Visit log(@RequestBody Visit visit) {
        return visitService.logVisit(visit);
    }
}
