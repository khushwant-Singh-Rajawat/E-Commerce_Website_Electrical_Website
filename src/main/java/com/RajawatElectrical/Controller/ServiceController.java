package com.RajawatElectrical.Controller;

import com.RajawatElectrical.Model.ServiceBooking;
import com.RajawatElectrical.Service.ServiceBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "*")
public class ServiceController {
    @Autowired
    private ServiceBookingService serviceBookingService;

    @PostMapping("/book")
    public ResponseEntity<String> bookService(@RequestBody ServiceBooking booking) {
        serviceBookingService.saveBooking(booking);
        return ResponseEntity.ok("✅ Service booked successfully! We will call you within 30 minutes.");
    }
}
