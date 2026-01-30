package com.recirclemart.service;

import com.recirclemart.entity.Visit;
import com.recirclemart.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisitService {

    @Autowired private VisitRepository visitRepository;

    public Visit logVisit(Visit visit) {
        return visitRepository.save(visit);
    }
}
