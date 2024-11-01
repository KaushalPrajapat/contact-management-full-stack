package signin_jwt.signin_jwt.services.Impl;

import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl {
    static String from = "prajapatkaushal555@gmail.com";

    @Autowired
    private JavaMailSender mailSender;

    private Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    public void sendEmailWithHtml(String to, String subject, String htmlContent) {
        MimeMessage mm = mailSender.createMimeMessage();
        try {
            MimeMessageHelper mmh = new MimeMessageHelper(mm, 1, "UTF-8");
            mmh.setTo(to);
            mmh.setSubject(subject);
            mmh.setText(htmlContent, true);
            mm.setFrom(from);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        mailSender.send(mm);
        System.out.println("Mail Sent xxxxxxxx.");
        logger.info("Email has been send to : HTML CONTENT");
    }

    public String validationCodeGenerater() {
        // It will generate 6 digit random Number.
        // from 0 to 999999
        Random rnd = new Random();
        int number = rnd.nextInt(999999);
        // this will convert any number sequence into 6 character.
        String six_digit = String.format("%06d", number);
        return six_digit;
    }

}
