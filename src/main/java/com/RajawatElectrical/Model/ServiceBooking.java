package com.RajawatElectrical.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "service_bookings")
public class ServiceBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String servicetype;

    private String details;

    @Column(nullable = false)
    private String address;

    private String preferredTime;

    @Enumerated(EnumType.STRING)
    private BookingStatus status=BookingStatus.PENDING;

    private LocalDateTime createdAt=LocalDateTime.now();
}
enum BookingStatus
{
    PENDING, CONFIRMED, COMPLETED, CANCELLED
}
