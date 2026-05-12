const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const bookingConnection = mongoose.createConnection('mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const bookingBaseSchema = new mongoose.Schema({
    userId: String,
    name: String,
    contact: String,
    email: String,
    eventType: String,
    date: Date,
    eventVenue: String,
    province: String,
    city: String,
    barangay: String,
    branchLocation: String,
    theme: String,
    guestCount: Number,
    
    paymentMode: String,
    discountType: String,
    discount: { type: Number, default: 0 },
    subTotal: { type: Number, default: 0 },
    promoDiscount: { type: Number, default: 0 },
    totalPrice: Number,
    
    paymentDetails: {
        paymentMode: String,
        paymentStatus: String,
        amountPaid: Number,
        paymentDate: String,
        transactionReference: String,
        paymentProof: String,
        paymentNotes: String,
        bookingReference: String 
    },
    products: [
        {
            image: String,
            title: String,
            price: Number,
            additionals: { type: [Object], default: [] }
        }
    ],
  specialRequest: String,
  service: String,
  details: Object,
  outsidePH: String,
  contractPicture: { type: String }, 
  suppliers: [{ type: mongoose.Schema.Types.ObjectId }],
  referenceNumber: { type: String }, 
  cancellationRequest: {
    status: { type: String, default: 'none' }, 
    reason: { type: String },
    description: { type: String },
    requestedBy: { type: String },
    requestedAt: { type: Date },
    processedBy: { type: String },
    processedAt: { type: Date },
    adminNotes: { type: String }
  },
  rescheduleRequest: {
    status: { type: String, default: 'none' }, 
    reason: { type: String },
    proposedDate: { type: Date },
    description: { type: String },
    requestedBy: { type: String },
    requestedAt: { type: Date },
    processedBy: { type: String },
    processedAt: { type: Date },
    adminNotes: { type: String },
    originalDate: { type: Date }
  },
  createdAt: { type: Date, default: Date.now }
}, { strict: false });

if (bookingConnection.models.PendingBooking) delete bookingConnection.models.PendingBooking;
if (bookingConnection.models.ApprovedBooking) delete bookingConnection.models.ApprovedBooking;
if (bookingConnection.models.FinishedBooking) delete bookingConnection.models.FinishedBooking;
if (bookingConnection.models.CancelledBooking) delete bookingConnection.models.CancelledBooking;

const PendingBooking = bookingConnection.model('PendingBooking', bookingBaseSchema);
const ApprovedBooking = bookingConnection.model('ApprovedBooking', bookingBaseSchema);
const FinishedBooking = bookingConnection.model('FinishedBooking', bookingBaseSchema);
const CancelledBooking = bookingConnection.model('CancelledBooking', bookingBaseSchema);

const notificationConnection = mongoose.createConnection('mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/notification', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const notificationSchema = require('../models/Notification').schema;
const Notification = notificationConnection.model('Notification', notificationSchema);

const authConnection = mongoose.createConnection('mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/authentication', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const supplierSchema = require('../models/Supplier').schema;
const Supplier = authConnection.model('Supplier', supplierSchema);

router.put('/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const updateData = req.body;

        if (updateData.paymentMode !== undefined) {
            updateData.paymentMode = String(updateData.paymentMode);
        }
        if (updateData.discountType !== undefined) {
            updateData.discountType = String(updateData.discountType);
        }
        if (updateData.discount !== undefined) {
            updateData.discount = Number(updateData.discount) || 0;
        }
        if (updateData.subTotal !== undefined) {
            updateData.subTotal = Number(updateData.subTotal) || 0;
        }
        if (updateData.totalPrice !== undefined) {
            updateData.totalPrice = Number(updateData.totalPrice) || 0;
        }
        
        if (updateData.promoTitle !== undefined) {
            updateData.promoTitle = String(updateData.promoTitle);
        }
        if (updateData.promoDiscount !== undefined) {
            updateData.promoDiscount = Number(updateData.promoDiscount) || 0;
        }

        if (updateData.contractPicture !== undefined) {
            updateData.contractPicture = String(updateData.contractPicture);
        }

        if (updateData.paymentDetails) {
            updateData.paymentDetails = {
                paymentMode: updateData.paymentDetails.paymentMode || '',
                paymentStatus: updateData.paymentDetails.paymentStatus || '',
                amountPaid: Number(updateData.paymentDetails.amountPaid) || 0,
                paymentDate: updateData.paymentDetails.paymentDate || '',
                transactionReference: updateData.paymentDetails.transactionReference || '',
                paymentProof: updateData.paymentDetails.paymentProof || '',
                paymentNotes: updateData.paymentDetails.paymentNotes || '',
                bookingReference: updateData.paymentDetails.bookingReference || ''
            };
        }

        let updatedBooking = await PendingBooking.findByIdAndUpdate(
            bookingId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            updatedBooking = await ApprovedBooking.findByIdAndUpdate(
                bookingId,
                updateData,
                { new: true }
            );
        }

        if (!updatedBooking) {
            updatedBooking = await FinishedBooking.findByIdAndUpdate(
                bookingId,
                updateData,
                { new: true }
            );
        }

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json(updatedBooking);
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
});

router.post('/:id/cancel-request', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { reason, description, userEmail } = req.body;

        if (!reason || !description) {
            return res.status(400).json({ message: 'Reason and description are required' });
        }

        const cancellationData = {
            cancellationRequest: {
                status: 'pending',
                reason,
                description,
                requestedBy: userEmail,
                requestedAt: new Date()
            }
        };

        let updatedBooking = await PendingBooking.findByIdAndUpdate(
            bookingId,
            cancellationData,
            { new: true }
        );

        if (!updatedBooking) {
            updatedBooking = await ApprovedBooking.findByIdAndUpdate(
                bookingId,
                cancellationData,
                { new: true }
            );
        }

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json({ message: 'Cancellation request submitted successfully', booking: updatedBooking });
    } catch (error) {
        console.error('Error requesting cancellation:', error);
        res.status(500).json({ message: 'Error requesting cancellation', error: error.message });
    }
});

router.get('/cancellation-requests/pending', async (req, res) => {
    try {
        const pendingCancellations = await PendingBooking.find({ 'cancellationRequest.status': 'pending' });
        const approvedCancellations = await ApprovedBooking.find({ 'cancellationRequest.status': 'pending' });
        
        res.json([...pendingCancellations, ...approvedCancellations]);
    } catch (error) {
        console.error('Error fetching cancellation requests:', error);
        res.status(500).json({ message: 'Error fetching cancellation requests', error: error.message });
    }
});

router.put('/:id/cancel-approve', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { adminEmail, adminNotes } = req.body;

        let booking = await PendingBooking.findById(bookingId);
        let sourceCollection = 'pending';
        
        if (!booking) {
            booking = await ApprovedBooking.findById(bookingId);
            sourceCollection = 'approved';
        }

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.cancellationRequest.status = 'approved';
        booking.cancellationRequest.processedBy = adminEmail;
        booking.cancellationRequest.processedAt = new Date();
        booking.cancellationRequest.adminNotes = adminNotes || '';

        const cancelledBooking = new CancelledBooking(booking.toObject());
        await cancelledBooking.save();

        if (sourceCollection === 'pending') {
            await PendingBooking.findByIdAndDelete(bookingId);
        } else {
            await ApprovedBooking.findByIdAndDelete(bookingId);
        }

        console.log('=== SUPPLIER NOTIFICATION DEBUG ===');
        console.log('Booking suppliers array:', booking.suppliers);
        console.log('Suppliers exists:', !!booking.suppliers);
        console.log('Suppliers length:', booking.suppliers?.length);
        console.log('Suppliers type:', typeof booking.suppliers);
        console.log('Booking object keys:', Object.keys(booking.toObject()));
        
        if (booking.suppliers && booking.suppliers.length > 0) {
            try {
                console.log('Attempting to notify suppliers...');
                
                const supplierNotifications = [];
                for (const supplierId of booking.suppliers) {
                    try {
                        console.log(`Looking up supplier ID: ${supplierId}`);
                        console.log(`Supplier ID type: ${typeof supplierId}`);
                        console.log(`Supplier ID toString: ${supplierId.toString()}`);
                        
                        const supplier = await Supplier.findById(supplierId);
                        console.log(`Supplier found:`, supplier ? `${supplier.email} (${supplier._id})` : 'NULL');
                        
                        if (supplier && supplier.email) {
                            
                            const notification = new Notification({
                                title: `Booking Cancelled - ${booking.eventType || 'Event'}`,
                                type: 'Supplier',
                                person: supplier.email,
                                date: booking.date ? new Date(booking.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                                location: booking.eventVenue || booking.branchLocation || 'N/A',
                                description: `The booking "${booking.eventType || 'Event'}" (Ref: ${booking.referenceNumber || booking._id}) assigned to you has been cancelled. Reason: ${booking.cancellationRequest.reason}. ${booking.cancellationRequest.adminNotes ? 'Admin notes: ' + booking.cancellationRequest.adminNotes : ''}`
                            });
                            await notification.save();
                            console.log(`✓ Notification saved for ${supplier.email}`);
                            supplierNotifications.push(supplier.email);
                        } else {
                            console.log(`✗ Supplier not found or has no email for ID: ${supplierId}`);
                        }
                    } catch (supplierError) {
                        console.error(`Error notifying supplier ${supplierId}:`, supplierError);
                        
                    }
                }
                console.log(`Sent cancellation notifications to ${supplierNotifications.length} supplier(s):`, supplierNotifications);
            } catch (notificationError) {
                console.error('Error sending supplier notifications:', notificationError);
                
            }
        } else {
            console.log('No suppliers to notify (suppliers array empty or undefined)');
        }
        console.log('=== END SUPPLIER NOTIFICATION DEBUG ===');

        res.json({ message: 'Cancellation approved and booking moved to cancelled', booking: cancelledBooking });
    } catch (error) {
        console.error('Error approving cancellation:', error);
        res.status(500).json({ message: 'Error approving cancellation', error: error.message });
    }
});

router.put('/:id/cancel-reject', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { adminEmail, adminNotes } = req.body;

        const cancellationData = {
            'cancellationRequest.status': 'rejected',
            'cancellationRequest.processedBy': adminEmail,
            'cancellationRequest.processedAt': new Date(),
            'cancellationRequest.adminNotes': adminNotes || ''
        };

        let updatedBooking = await PendingBooking.findByIdAndUpdate(
            bookingId,
            cancellationData,
            { new: true }
        );

        if (!updatedBooking) {
            updatedBooking = await ApprovedBooking.findByIdAndUpdate(
                bookingId,
                cancellationData,
                { new: true }
            );
        }

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json({ message: 'Cancellation request rejected', booking: updatedBooking });
    } catch (error) {
        console.error('Error rejecting cancellation:', error);
        res.status(500).json({ message: 'Error rejecting cancellation', error: error.message });
    }
});

router.get('/cancelled', async (req, res) => {
    try {
        const cancelledBookings = await CancelledBooking.find().sort({ createdAt: -1 });
        res.json(cancelledBookings);
    } catch (error) {
        console.error('Error fetching cancelled bookings:', error);
        res.status(500).json({ message: 'Error fetching cancelled bookings', error: error.message });
    }
});

router.put('/:id/reset-cancellation', async (req, res) => {
    try {
        const bookingId = req.params.id;

        let updatedBooking = await PendingBooking.findByIdAndUpdate(
            bookingId,
            { $unset: { cancellationRequest: "" } },
            { new: true }
        );

        if (!updatedBooking) {
            updatedBooking = await ApprovedBooking.findByIdAndUpdate(
                bookingId,
                { $unset: { cancellationRequest: "" } },
                { new: true }
            );
        }

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json({ message: 'Cancellation request reset', booking: updatedBooking });
    } catch (error) {
        console.error('Error resetting cancellation:', error);
        res.status(500).json({ message: 'Error resetting cancellation', error: error.message });
    }
});

router.post('/:id/reschedule-request', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { reason, proposedDate, description, userEmail } = req.body;

        if (!reason || !proposedDate || !description) {
            return res.status(400).json({ message: 'Reason, proposed date, and description are required' });
        }

        let booking = await PendingBooking.findById(bookingId);
        if (!booking) {
            booking = await ApprovedBooking.findById(bookingId);
        }

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const rescheduleData = {
            rescheduleRequest: {
                status: 'pending',
                reason,
                proposedDate: new Date(proposedDate),
                description,
                requestedBy: userEmail,
                requestedAt: new Date(),
                originalDate: booking.date
            }
        };

        let updatedBooking = await PendingBooking.findByIdAndUpdate(
            bookingId,
            rescheduleData,
            { new: true }
        );

        if (!updatedBooking) {
            updatedBooking = await ApprovedBooking.findByIdAndUpdate(
                bookingId,
                rescheduleData,
                { new: true }
            );
        }

        res.json({ message: 'Reschedule request submitted successfully', booking: updatedBooking });
    } catch (error) {
        console.error('Error requesting reschedule:', error);
        res.status(500).json({ message: 'Error requesting reschedule', error: error.message });
    }
});

router.get('/reschedule-requests/pending', async (req, res) => {
    try {
        const pendingReschedules = await PendingBooking.find({ 'rescheduleRequest.status': 'pending' });
        const approvedReschedules = await ApprovedBooking.find({ 'rescheduleRequest.status': 'pending' });
        
        res.json([...pendingReschedules, ...approvedReschedules]);
    } catch (error) {
        console.error('Error fetching reschedule requests:', error);
        res.status(500).json({ message: 'Error fetching reschedule requests', error: error.message });
    }
});

router.put('/:id/reschedule-approve', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { adminEmail, adminNotes } = req.body;

        let booking = await PendingBooking.findById(bookingId);
        let sourceCollection = 'pending';
        
        if (!booking) {
            booking = await ApprovedBooking.findById(bookingId);
            sourceCollection = 'approved';
        }

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const oldDate = booking.date;
        const newDate = booking.rescheduleRequest.proposedDate;

        booking.rescheduleRequest.status = 'approved';
        booking.rescheduleRequest.processedBy = adminEmail;
        booking.rescheduleRequest.processedAt = new Date();
        booking.rescheduleRequest.adminNotes = adminNotes || '';
        booking.date = newDate; 

        await booking.save();

        if (sourceCollection === 'approved') {
            try {
                const calendarConnection = mongoose.createConnection('mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/scheduleCalendar', {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });

                const Appointment = calendarConnection.model('Appointment', new mongoose.Schema({}, { strict: false }));
                
                const appointment = await Appointment.findOne({ bookingId: bookingId });
                if (appointment) {
                    appointment.date = typeof newDate === 'string' ? newDate : new Date(newDate).toISOString().split('T')[0];
                    await appointment.save();
                    console.log(`Updated appointment date for booking ${bookingId} to ${appointment.date}`);
                }
                
                await calendarConnection.close();
            } catch (appointmentError) {
                console.error('Error updating appointment date:', appointmentError);
                
            }
        }

        if (booking.suppliers && booking.suppliers.length > 0) {
            try {
                const supplierNotifications = [];
                for (const supplierId of booking.suppliers) {
                    try {
                        const supplier = await Supplier.findById(supplierId);
                        
                        if (supplier && supplier.email) {
                            const notification = new Notification({
                                title: `Booking Rescheduled - ${booking.eventType || 'Event'}`,
                                type: 'Supplier',
                                person: supplier.email,
                                date: newDate ? new Date(newDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                                location: booking.eventVenue || booking.branchLocation || 'N/A',
                                description: `The booking "${booking.eventType || 'Event'}" (Ref: ${booking.referenceNumber || booking._id}) has been rescheduled. Old date: ${new Date(oldDate).toLocaleDateString()}. New date: ${new Date(newDate).toLocaleDateString()}. Reason: ${booking.rescheduleRequest.reason}. ${booking.rescheduleRequest.adminNotes ? 'Admin notes: ' + booking.rescheduleRequest.adminNotes : ''}`
                            });
                            await notification.save();
                            supplierNotifications.push(supplier.email);
                        }
                    } catch (supplierError) {
                        console.error(`Error notifying supplier ${supplierId}:`, supplierError);
                    }
                }
                console.log(`Sent reschedule notifications to ${supplierNotifications.length} supplier(s):`, supplierNotifications);
            } catch (notificationError) {
                console.error('Error sending supplier notifications:', notificationError);
            }
        }

        res.json({ message: 'Reschedule approved and booking date updated', booking });
    } catch (error) {
        console.error('Error approving reschedule:', error);
        res.status(500).json({ message: 'Error approving reschedule', error: error.message });
    }
});

router.put('/:id/reschedule-reject', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { adminEmail, adminNotes } = req.body;

        const rescheduleData = {
            'rescheduleRequest.status': 'rejected',
            'rescheduleRequest.processedBy': adminEmail,
            'rescheduleRequest.processedAt': new Date(),
            'rescheduleRequest.adminNotes': adminNotes || ''
        };

        let updatedBooking = await PendingBooking.findByIdAndUpdate(
            bookingId,
            rescheduleData,
            { new: true }
        );

        if (!updatedBooking) {
            updatedBooking = await ApprovedBooking.findByIdAndUpdate(
                bookingId,
                rescheduleData,
                { new: true }
            );
        }

        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.json({ message: 'Reschedule request rejected', booking: updatedBooking });
    } catch (error) {
        console.error('Error rejecting reschedule:', error);
        res.status(500).json({ message: 'Error rejecting reschedule', error: error.message });
    }
});

module.exports = router;