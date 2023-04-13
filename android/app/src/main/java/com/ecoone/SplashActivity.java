package com.ecoone;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import androidx.appcompat.app.AppCompatActivity;


public class SplashActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_splash);

    new Handler().postDelayed(new Runnable() {
      @Override
      public void run() {
        Intent intent = new Intent(SplashActivity.this, MainActivity.class);
        Bundle extras = getIntent().getExtras();
        if (extras != null) {
          intent.putExtras(extras);
        }
        startActivity(intent);
        finish();
      }
    }, 1000);
  }
}
