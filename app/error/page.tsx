"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Lottie from 'lottie-react';
import errorAnimation from '../../components/error-animation.json';

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black p-4">
      <div className="flex justify-center mb-8">
        <Lottie animationData={errorAnimation} loop={true} style={{ height: 400, width: 400 }} />
      </div>
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-md border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-900 dark:text-red-100">
              Oops! Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-row gap-2">
              <Button
                onClick={() => window.location.reload()}
                className="flex-1"
              >
                Refresh Page
              </Button>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="flex-1"
              >
                Go Back
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/'}
                className="flex-1"
              >
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}