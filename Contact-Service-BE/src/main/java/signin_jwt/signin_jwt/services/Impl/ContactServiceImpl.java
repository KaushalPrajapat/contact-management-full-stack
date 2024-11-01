package signin_jwt.signin_jwt.services.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import signin_jwt.signin_jwt.models.Contact;
import signin_jwt.signin_jwt.models.Response;
import signin_jwt.signin_jwt.models.User;
import signin_jwt.signin_jwt.repositories.ContactRepo;

@Service
public class ContactServiceImpl {

    @Autowired
    private ContactRepo contactRepo;

    public Response saveContact(Contact contact) {
        User pUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<Contact> con = contactRepo.findByPhoneAndUserUserId(contact.getPhone(), pUser.getUserId());
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user != null) {
            if (con.isPresent()) {
                return Response.builder().statusCode(500)
                        .message("Phone Number Already Exists!! 😔😔").build();
            }
            contact.setUser(user);
            contactRepo.save(contact);
            return Response.builder().statusCode(200)
                    .message("Saved SuccessFully!! 😊😊").build();
        }
        return Response.builder().statusCode(500)
                .message("SomeThing is Wrong Can't save!! 😔😔").build();
    }

    public List<Contact> getAllContactOfAUser(User pUser) {
        return contactRepo.findByUser(pUser).orElse(null);
    }

    public Contact deleteContact(int contact_id) {
        Optional<Contact> contact = contactRepo.findById(contact_id);
        contactRepo.deleteById(contact_id);
        System.out.println("is deleted");
        return contact.get();
    }

    public Response updateContact(Contact contact, int contact_id, User pUser) {
        Optional<Contact> existingContact = contactRepo.findByContactIdAndUserUserId(contact_id, pUser.getUserId());
        if (existingContact.isPresent()) {
            if (contact.getEmail() != null) {
                existingContact.get().setEmail(contact.getEmail());
            }
            if (contact.getPhone() != null) {
                existingContact.get().setPhone(contact.getPhone());
            }
            if (contact.getFirstName() != null) {
                existingContact.get().setFirstName(contact.getFirstName());
            }
            if (contact.getLastName() != null) {
                existingContact.get().setLastName(contact.getLastName());
            }
            if (contact.getComment() != null) {
                existingContact.get().setComment(contact.getComment());
            }
            System.out.println(existingContact.get().getFirstName());
            contactRepo.save(existingContact.get());
        } else
            return Response.builder().statusCode(500)
                    .message("SomeThing is Wrong Can't save!! 😔😔").build();
        
        return Response.builder().statusCode(200)
                .message("Updated SuccessFully!! 😊😊").build();
    }

}
