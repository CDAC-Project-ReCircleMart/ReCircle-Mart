package com.recirclemart.controller;

import com.recirclemart.entity.Visit;
import com.recirclemart.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/visits")
public class VisitController {

    @Autowired private VisitService visitService;

    @PostMapping
    public Visit log(@RequestBody Visit visit) {
        return visitService.logVisit(visit);
    }
}
