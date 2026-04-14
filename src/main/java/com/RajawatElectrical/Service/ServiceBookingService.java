package com.RajawatElectrical.Service;

import com.RajawatElectrical.Model.ServiceBooking;
import com.RajawatElectrical.Repository.ServiceBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceBookingService {
    @Autowired
    private ServiceBookingRepository serviceBookingRepository;

    // ✅ FIX: saveBooking method
    public ServiceBooking saveBooking(ServiceBooking booking) {
        return serviceBookingRepository.save(booking);
    }
}
