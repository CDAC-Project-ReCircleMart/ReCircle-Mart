package com.recirclemart.analytics.service;

import com.recirclemart.analytics.entity.Visit;
import com.recirclemart.analytics.repository.VisitRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisitService {

    @Autowired
    private VisitRepository visitRepository;

    public Visit logVisit(Visit visit) {
        return visitRepository.save(visit);
    }
}
